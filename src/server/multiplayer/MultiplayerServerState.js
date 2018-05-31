/* eslint-disable no-console */
import { chunk, compact, find, mapValues, pull, reject } from 'lodash';

import { id as generateID } from '../../common/util/common';
import { saveGame } from '../../common/util/firebase';
import defaultGameState from '../../common/store/defaultGameState';
import gameReducer from '../../common/reducers/game';

import { getPeopleInGame, withoutClient } from './util';

export default class MultiplayerServerState {
  state = {
    connections: {},  // map of { clientID: websocket }
    games: [],  // array of { id, name, format, players, playerColors, spectators, actions, decks, usernames, startingSeed }
    gameObjects: {}, // map of { gameID: game }
    waitingPlayers: [],  // array of { id, name, format, deck, players }
    matchmakingQueue: [], // array of { clientID, deck }
    playersOnline: [],  // array of clientIDs
    userData: {} // map of { clientID: { uid, displayName, ... } }
  };

  /* Getters */

  // Returns a serializable subset of the state for broadcast as an INFO message.
  serialize = () => {
    const { games, waitingPlayers, playersOnline, userData, matchmakingQueue } = this.state;
    return {
      games,
      waitingPlayers,
      playersOnline,
      usernames: mapValues(userData, 'displayName'),
      queueSize: matchmakingQueue.length
    };
  }

  // Returns the socket corresponding to a given player.
  getClientSocket = (clientID) => (
    this.state.connections[clientID]
  )

  // Returns all websocket connections corresponding to the given clientIDs,
  // or ALL connections if no clientIDs are specified.
  getClientSockets = (clientIDs = null) => (
    clientIDs ? clientIDs.map(this.getClientSocket) : Object.values(this.state.connections)
  )

  // Returns the user data for the given player, if it exists.
  getClientUserData = (clientID) => (
    this.state.userData[clientID]
  )

  // Returns the username to use for the given player.
  // If fallbackToClientID is true, falls back to the client ID if there is no
  // username set, otherwise returns null.
  getClientUsername = (clientID, fallbackToClientID = true) => (
    this.getClientUserData(clientID)
      ? this.getClientUserData(clientID).displayName
      : (fallbackToClientID && clientID)
  )

  // Returns the game that the given player is in, if any.
  lookupGameByClient = (clientID) => (
    this.state.games.find(game => game.players.includes(clientID))
  )

  // Returns all *other* players in the game that the given player is in, if any.
  getAllOpponents = (clientID) => {
    const game = this.state.games.find(g => [...g.players, ...g.spectators].includes(clientID));
    return game ? getPeopleInGame(game).filter(id => id !== clientID) : [];
  }

  // Returns all *other* players currently in the lobby.
  getAllOtherPlayersInLobby = (clientID) => {
    const inGamePlayerIds = this.state.games.reduce((acc, game) => acc.concat(game.players), []);
    return this.state.playersOnline.filter(id => id !== clientID && !inGamePlayerIds.includes(id));
  }

  /* Mutations */

  // Connect a player at the specified websocket to the server.
  connectClient = (clientID, socket) => {
    this.state.connections[clientID] = socket;
    this.state.playersOnline.push(clientID);
    console.log(`${this.getClientUsername(clientID)} joined the room.`);
  }

  // Disconnect a player from the server.
  // Return the game that the player was in (if any).
  disconnectClient = (clientID) => {
    pull(this.state.playersOnline, clientID);
    this.state.waitingPlayers = reject(this.state.waitingPlayers, { id: clientID });

    const game = this.lookupGameByClient(clientID);
    if (game) {
      this.leaveGame(clientID);
    }

    delete this.state.connections[clientID];
    console.log(`${this.getClientUsername(clientID)} left the game.`);

    return game;
  }

  // Set a player's username.
  setClientUserData = (clientID, userData) => {
    this.state.userData[clientID] = userData;
  }

  // Add an player action to the game that player is in.
  // Also, updates the game state and checks if the game has been won.
  appendGameAction = (clientID, action) => {
    const game = this.state.games.find(g => g.players.includes(clientID));
    if (game) {
      game.actions.push(action);
      game.state = gameReducer(game.state, action);
      if (game.state.winner) {
        this.endGame(game);
      }
    }
  }

  // Make a player host a game with the given name and using the given deck.
  hostGame = (clientID, name, format, deck) => {
    this.state.waitingPlayers.push({
      id: clientID,
      players: [clientID],
      name,
      format,
      deck
    });
    console.log(`${this.getClientUsername(clientID)} started game ${name}.`);
  }

  // Make a player join the given opponent's hosted game with the given deck.
  // Returns the game joined.
  joinGame = (clientID, opponentID, deck, gameProps = {}) => {
    const waitingPlayer = find(this.state.waitingPlayers, { id: opponentID });
    const gameId = generateID();

    const game = {
      id: gameId,
      name: `Casual#${waitingPlayer.name}`,
      format: waitingPlayer.format,

      players: [clientID, opponentID],
      playerColors: {[clientID]: 'blue', [opponentID]: 'orange'},
      spectators: [],

      type: 'CASUAL',
      decks: {orange: waitingPlayer.deck, blue: deck},
      usernames: {
        orange: this.getClientUsername(opponentID),
        blue: this.getClientUsername(clientID)
      },
      ids : {
        blue: clientID,
        orange: opponentID
      },
      startingSeed: generateID(),

      actions: [],
      state: defaultGameState,

      ...gameProps
    };

    this.state.waitingPlayers = reject(this.state.waitingPlayers, { id: opponentID });
    this.state.games.push(game);

    console.log(`${this.getClientUsername(clientID)} joined game ${game.name} against ${this.getClientUsername(opponentID)}.`);
    return game;
  }

  // Make a player join the given game as a spectator.
  // Returns the game joined, or null if the game wasn't found.
  spectateGame = (clientID, gameID) => {
    const game = find(this.state.games, { id: gameID });
    if (game) {
      game.spectators.push(clientID);
      console.log(`${this.getClientUsername(clientID)} joined game ${game.name} as a spectator.`);
      return game;
    }
  }

  // Remove a player from any game that they are currently in.
  leaveGame = (clientID) => {
    this.state.games = compact(this.state.games.map(game => withoutClient(game, clientID)));
  }

  // Handle end-of-game actions.
  endGame = (game) => {
    if (game.state.winner) {
      this.storeGameResult(game);
      // TODO Alter player ratings accordingly.
    }
  }

  // Store the result of a game in Firebase.
  storeGameResult = (game) => {
    const { ids, format, type, state: { winner } } = game;
    saveGame({
      players: mapValues(ids, clientID => this.getClientUserData(clientID).uid),
      format,
      type,
      winner
    });
  }

  // Add a player to the matchmaking queue.
  joinQueue = (clientID, deck) => {
    this.state.matchmakingQueue.push({ clientID, deck });
  }

  // Remove a player from the matchmaking queue.
  leaveQueue = (clientID) => {
    this.state.matchmakingQueue = reject(this.state.matchmakingQueue, { clientID });
  }

  // Return pairs of player IDs to match into games.
  // TODO: Fix this, using MMR.
  findAvailableMatches = () => {
    const playerIds = this.state.matchmakingQueue.map(m => m.clientID);
    return chunk(playerIds, 2).filter(m => m.length === 2);
  }

  // Pair players if there are at least two people waiting for a ranked game.
  // Return all games created.
  matchPlayersIfPossible = () => {
    const { matchmakingQueue } = this.state;
    const playerPairs = this.findAvailableMatches();

    return playerPairs.map(([pid1, pid2]) => {
      const gameName = `Ranked#${this.getClientUsername(pid1)}-vs-${this.getClientUsername(pid2)}`;
      const deck1 = find(matchmakingQueue, {clientID: pid1}).deck;
      const deck2 = find(matchmakingQueue, {clientID: pid2}).deck;

      this.hostGame(pid1, gameName, 'normal', deck1);
      const game = this.joinGame(pid2, pid1, deck2, { type: 'RANKED' });

      this.state.matchmakingQueue = reject(matchmakingQueue, m => [pid1, pid2].includes(m.clientID));
      this.state.games.push(game);
      return game;
    });
  }
}
