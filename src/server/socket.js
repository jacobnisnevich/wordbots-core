import WebSocket from 'ws';
import { noop } from 'lodash';

import { id as generateID } from '../common/util/common';
import { opponent as opponentOf } from '../common/util/game';

import MultiplayerServerState from './multiplayer/MultiplayerServerState';

const QUEUE_INTERVAL_MSECS = 500;


/* eslint-disable no-console */
export default function launchWebsocketServer(server, path) {
  const state = new MultiplayerServerState();

  const wss = new WebSocket.Server({
    server: server,
    path: '/socket',
    perMessageDeflate: false
  });

  wss.on('listening', onOpen);
  wss.on('connection', onConnect);

  function onOpen() {
    const addr = wss.options.server.address();
    console.log(`WebSocket listening at http://${addr.address}:${addr.port}${path}`);
  }

  function onConnect(socket) {
    const clientID = generateID();
    state.connectClient(clientID, socket);
    broadcastInfo();

    socket.on('message', msg => {
      onMessage(clientID, msg);
    });
    socket.on('close', () => {
      onDisconnect(clientID);
    });
    socket.on('error', noop); // Probably a disconnect (throws an error in ws 3.3.3+).
  }

  function onMessage(clientID, data) {
    const {type, payload} = JSON.parse(data);

    if (type === 'ws:HOST') {
      hostGame(clientID, payload.name, payload.deck);
    } else if (type === 'ws:JOIN') {
      joinGame(clientID, payload.id, payload.deck);
    } else if (type === 'ws:JOIN_QUEUE') {
      joinQueue(clientID, payload.deck);
    } else if (type === 'ws:LEAVE_QUEUE') {
      leaveQueue(clientID);
    } else if (type === 'ws:SPECTATE') {
      spectateGame(clientID, payload.id, payload.deck);
    } else if (type === 'ws:LEAVE') {
      leaveGame(clientID);
    } else if (type === 'ws:SET_USERNAME') {
      setUsername(clientID, payload.username);
    } else if (type === 'ws:CHAT') {
      const inGame = state.getAllOpponents(clientID);
      const payloadWithSender = Object.assign({}, payload, {sender: clientID});
      (inGame ? sendMessageInGame : sendMessageInLobby)(clientID, 'ws:CHAT', payloadWithSender);
    } else if (type === 'ws:FORFEIT') {
      endGame(clientID, payload.winner);
    } else if (type !== 'ws:KEEPALIVE') {
      state.appendGameAction(clientID, {type, payload});
      sendMessageInGame(clientID, type, payload);
    }
  }

  function onDisconnect(clientID) {
    const game = state.disconnectClient(clientID);
    sendChat(`${state.getClientUsername(clientID)} has left.`);
    if (game) {
      sendMessageInGame(clientID, 'ws:FORFEIT', {'winner': opponentOf(game.playerColors[clientID])});
    }
  }

  function sendMessage(type, payload = {}, recipientIDs = null) {
    const message = JSON.stringify({type, payload});
    state.getClientSockets(recipientIDs).forEach(socket => {
      try {
        socket.send(message);
      } catch (err) {
        console.warn(`Failed to send message ${message} to ${recipientIDs}: ${err.message}`);
      }
    });
  }

  function sendMessageInLobby(clientID, type, payload = {}) {
    console.log(`${clientID} broadcast a message to the lobby: ${type} ${JSON.stringify(payload)}`);
    sendMessage(type, payload, state.getAllOtherPlayersInLobby(clientID));
  }

  function sendMessageInGame(clientID, type, payload = {}) {
    const opponentIds = state.getAllOpponents(clientID);
    if (opponentIds) {
      console.log(`${clientID} sent action to ${opponentIds}: ${type}, ${JSON.stringify(payload)}`);
      sendMessage(type, payload, opponentIds);
    }
  }

  function sendChat(msg, recipientIDs = null) {
    sendMessage('ws:CHAT', {msg: msg, sender: '[Server]'}, recipientIDs);
  }

  function broadcastInfo() {
    sendMessage('ws:INFO', state.serialize());
  }

  function setUsername(clientID, newUsername) {
    const oldUsername = state.getClientUsername(clientID, false);
    state.setClientUsername(clientID, newUsername);
    if (!oldUsername) {
      sendChat(`${newUsername || clientID} has entered the lobby.`);
    } else if (oldUsername !== newUsername) {
      if (oldUsername === 'Guest') {
        sendChat(`${newUsername} has logged in.`);
      } else if (newUsername === 'Guest') {
        sendChat(`${oldUsername} has logged out.`);
      } else {
        sendChat(`${oldUsername} has changed their name to ${newUsername}.`);
      }
    }
    broadcastInfo();
  }

  function hostGame(clientID, name, deck) {
    state.hostGame(clientID, name, deck);
    broadcastInfo();
  }

  function joinGame(clientID, opponentID, deck) {
    const game = state.joinGame(clientID, opponentID, deck);
    const { decks, name, startingSeed, usernames } = game;

    sendMessage('ws:GAME_START', {'player': 'blue', decks, usernames, seed: startingSeed }, [clientID]);
    sendMessage('ws:GAME_START', {'player': 'orange', decks, usernames, seed: startingSeed }, [opponentID]);
    sendChat(`Entering game ${name} ...`, [clientID, opponentID]);
    broadcastInfo();
  }

  function joinQueue(clientID, deck) {
    state.joinQueue(clientID, deck);

    broadcastInfo();
  }

  function leaveQueue(clientID) {
    state.leaveQueue(clientID);

    broadcastInfo();
  }

  function spectateGame(clientID, gameID) {
    const game = state.spectateGame(clientID, gameID);
    if (game) {
      const { actions, decks, name, startingSeed, usernames } = game;

      sendMessage('ws:GAME_START', { player: 'neither', decks, usernames, seed: startingSeed }, [clientID]);
      sendMessage('ws:CURRENT_STATE', {'actions': actions}, [clientID]);
      sendChat(`Entering game ${name} as a spectator ...`, [clientID]);
      sendChat(`${state.getClientUsername(clientID)} has joined as a spectator.`, state.getAllOpponents(clientID));

      state.storeGame(game);

      broadcastInfo();
    }
  }

  function leaveGame(clientID) {
    state.leaveGame(clientID);
    sendChat('Entering the lobby ...', [clientID]);
    broadcastInfo();
  }

  function handleMatching() {
    const new_matches = state.handleMatching();
    new_matches.forEach((new_match) => {
      const { decks, name, startingSeed, usernames } = new_match;

      sendMessage('ws:GAME_START', {'player': 'blue', decks, usernames, seed: startingSeed }, [new_match.ids.blue]);
      sendMessage('ws:GAME_START', {'player': 'orange', decks, usernames, seed: startingSeed }, [new_match.ids.orange]);
      sendChat(`Entering game ${name} ...`, [new_match.players]);
    });
    broadcastInfo();
  }

  function endGame(clientID, winner) {
    const game = state.lookupGameByClient(clientID);
    // update result and save
    if (game.ids.blue === winner){
      game.result = 'BLUE_WIN';
    }
    else if (game.ids.orange === winner){
      game.result = 'ORANGE_WIN';
    }
    state.storeGame(game);
    // calculate rating changes and save
      if (game.ids.blue in this.state.userInfo && !('rating' in this.state.userInfo[game.ids.blue])){
        this.state.userInfo[game.ids.blue].rating = 1200;
      }
      if (game.ids.orange in this.state.userInfo && !('rating' in this.state.userInfo[game.ids.orange])){
          this.state.userInfo[game.ids.orange].rating = 1200;
      }
      // @TODO: Calculate ratings changes
      this.state.storeRating(game.ids.blue);
      this.state.storeRating(game.ids.orange);
  }

  setInterval(handleMatching, QUEUE_INTERVAL_MSECS);

}
