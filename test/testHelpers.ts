import { cloneDeep, findIndex, has, isArray, isObject, mapValues, noop, pickBy } from 'lodash';

import * as gameActions from '../src/common/actions/game';
import * as socketActions from '../src/common/actions/socket';
import HexUtils from '../src/common/components/hexgrid/HexUtils';
import { BLUE_CORE_HEX, DECK_SIZE, ORANGE_CORE_HEX, TYPE_EVENT } from '../src/common/constants';
import game from '../src/common/reducers/game';
import { transportObject } from '../src/common/reducers/handlers/game/board';
import { collection } from '../src/common/store/cards';
import defaultCollectionState from '../src/common/store/defaultCollectionState';
import defaultCreatorState from '../src/common/store/defaultCreatorState';
import defaultGameState from '../src/common/store/defaultGameState';
import defaultSocketState from '../src/common/store/defaultSocketState';
import * as w from '../src/common/types';
import { instantiateCard } from '../src/common/util/cards';
import {
  allObjectsOnBoard, applyAbilities, drawCards, getAttribute, opponent,
  ownerOf, validPlacementHexes
} from '../src/common/util/game';

import { attackBotCard } from './data/cards';

interface Target {
  hex?: w.HexId
  card?: w.CardInStore | number
}

/** Run the given block with console.error(...) messages suppressed within it. */
export function withConsoleErrorsSuppressed(fn: () => void): void {
  const oldConsoleError = console.error;
  console.error = noop;
  fn();
  console.error = oldConsoleError;
}

export function getDefaultState(format: string | null = null): w.GameState {
  const state = cloneDeep(defaultGameState);
  const dummyDeck = [attackBotCard].concat(collection.slice(1, DECK_SIZE));
  const simulatedGameStartAction = {
    type: socketActions.GAME_START,
    payload: {
      decks: {
        orange: dummyDeck.map(instantiateCard),
        blue: dummyDeck.map(instantiateCard)
      },
      format
    }
  };
  return game(state, simulatedGameStartAction);
}

export const startingHandSize: number = getDefaultState().players.orange.hand.length;

export function combineState(gameState: w.GameState = defaultGameState): w.State {
  return {
    game: gameState,
    creator: defaultCreatorState,
    collection: defaultCollectionState,
    socket: defaultSocketState,

    global: {
      user: null
    },
    version: '0'
  };
}

export function objectsOnBoardOfType(state: w.GameState, objectType: w.CardType): Record<w.HexId, string> {
  const objects = pickBy(allObjectsOnBoard(state), { card: { type: objectType } });
  return mapValues(objects, 'card.name');
}

export function queryObjectAttribute(state: w.GameState, hex: w.HexId, attr: w.Attribute): number | undefined {
  return getAttribute(allObjectsOnBoard(state)[hex], attr);
}

export function queryRobotAttributes(state: w.GameState, hex: w.HexId): string | undefined {
  if (allObjectsOnBoard(state)[hex]) {
    return [
      getAttribute(allObjectsOnBoard(state)[hex], 'attack'),
      getAttribute(allObjectsOnBoard(state)[hex], 'health'),
      getAttribute(allObjectsOnBoard(state)[hex], 'speed')
    ].join('/');
  }
}

export function queryPlayerHealth(state: w.GameState, playerName: w.PlayerColor): number {
  return queryObjectAttribute(state, { blue: BLUE_CORE_HEX, orange: ORANGE_CORE_HEX }[playerName], 'health')!;
}

export function drawCardToHand(state: w.GameState, playerName: w.PlayerColor, card: w.CardInStore): w.GameState {
  const player = state.players[playerName];
  player.deck = [instantiateCard(card as w.CardInStore)].concat(player.deck as w.CardInGame[]);
  return drawCards(state, player, 1);
}

export function newTurn(state: w.GameState, playerName: w.PlayerColor): w.GameState {
  if (state.currentTurn === playerName) {
    // Pass twice.
    return game(state, [gameActions.passTurn(playerName), gameActions.passTurn(opponent(playerName))]);
  } else {
    // Pass once.
    return game(state, gameActions.passTurn(state.currentTurn));
  }
}

export function playObject(
  state: w.GameState,
  playerName: w.PlayerColor,
  card: w.CardInStore,
  hex: w.HexId,
  target: Target | null = null
): w.GameState {
  const player = state.players[playerName];

  // We don't care about testing card draw and energy here, so ensure that:
  //    1. It's the player's turn.
  //    2. The player has the card as the first card in their hand.
  //    3. The player has enough energy to play the card.
  card = instantiateCard(card);
  state.currentTurn = playerName;
  player.hand = [card].concat(player.hand as w.CardInStore[]);
  player.energy.available += card.cost;

  if (target?.hex) {
    return game(state, [
      gameActions.setSelectedCard(0, playerName),
      gameActions.placeCard(hex, 0),
      gameActions.setSelectedTile(target.hex, playerName)
    ]);
  } else if (target?.card) {
    const cardIdx = isObject(target.card) ? findIndex(player.hand, ['name', (target.card as w.CardInGame).name])! : (target.card as number);
    return game(state, [
      gameActions.setSelectedCard(0, playerName),
      gameActions.placeCard(hex, 0),
      gameActions.setSelectedCard(cardIdx, playerName)
    ]);
  } else {
    return game(state, [
      gameActions.setSelectedCard(0, playerName),
      gameActions.placeCard(hex, 0)
    ]);
  }
}

export function playEvent(
  state: w.GameState,
  playerName: w.PlayerColor,
  card: w.CardInStore,
  targets: Target | Target[] = [{ hex: '0,0,0' }]
): w.GameState {
  // (Target the center hex by default for global events.)

  if (!isArray(targets)) {
    targets = [targets];
  }

  const player = state.players[playerName];

  // We don't care about testing card draw and energy here, so ensure that:
  //    1. It's the player's turn.
  //    2. The player has the card as the first card in their hand.
  //    3. The player has enough energy to play the card.
  card = instantiateCard(card);
  state.currentTurn = playerName;
  player.hand = [card].concat(player.hand as w.CardInStore[]);
  player.energy.available += card.cost;

  state = game(state, gameActions.setSelectedCard(0, playerName));

  targets.forEach((target) => {
    if (target.hex) {
      state = game(state, gameActions.setSelectedTile(target.hex, playerName));
    } else if (has(target, 'card')) {
      const cardIdx = isObject(target.card) ? findIndex(player.hand, ['name', (target.card as w.CardInGame).name])! : (target.card as number);
      state = game(state, gameActions.setSelectedCard(cardIdx, playerName));
    }
  });

  return state;
}

export function moveRobot(state: w.GameState, fromHex: w.HexId, toHex: w.HexId, asNewTurn = false): w.GameState {
  if (asNewTurn) {
    const owner = ownerOf(state, allObjectsOnBoard(state)[fromHex])!.color;
    state = newTurn(state, owner);
  }

  if (!state.players[state.currentTurn].objectsOnBoard[fromHex]) {
    throw new Error(`No ${state.currentTurn} robot on ${fromHex}!`);
  }

  return game(state, [
    gameActions.setSelectedTile(fromHex, state.currentTurn),
    gameActions.moveRobot(fromHex, toHex)
  ]);
}

export function attack(state: w.GameState, source: w.HexId, target: w.HexId, asNewTurn = false): w.GameState {
  if (asNewTurn) {
    const owner = ownerOf(state, allObjectsOnBoard(state)[source])!.color;
    state = newTurn(state, owner);
  }

  if (!state.players[state.currentTurn].objectsOnBoard[source]) {
    throw new Error(`No ${state.currentTurn} robot on ${source}!`);
  }

  return game(state, [
    gameActions.setSelectedTile(source, state.currentTurn),
    gameActions.attack(source, target),
    gameActions.attackComplete()
  ]);
}

export function activate(state: w.GameState, hex: w.HexId, abilityIdx: number, target: Target | null = null, asNewTurn = false): w.GameState {
  const player = ownerOf(state, allObjectsOnBoard(state)[hex])!;

  if (asNewTurn) {
    state = newTurn(state, player.color);
  }

  if (target?.hex) {
    return game(state, [
      gameActions.setSelectedTile(hex, player.color),
      gameActions.activateObject(abilityIdx),
      gameActions.setSelectedTile(target.hex, player.color)
    ]);
  } else if (target && has(target, 'card')) {
    const cardIdx = isObject(target.card) ? findIndex(player.hand, ['name', (target.card as w.CardInGame).name])! : (target.card as number);
    return game(state, [
      gameActions.setSelectedTile(hex, player.color),
      gameActions.activateObject(abilityIdx),
      gameActions.setSelectedCard(cardIdx, player.color)
    ]);
  } else {
    return game(state, [
      gameActions.setSelectedTile(hex, player.color),
      gameActions.activateObject(abilityIdx)
    ]);
  }
}

export function setUpBoardState(players: Record<string, Record<w.HexId, w.CardInStore>>): w.GameState {
  let state = getDefaultState();

  ['blue', 'orange'].forEach((playerName) => {
    const player: Record<w.HexId, w.CardInStore> = players[playerName as w.PlayerColor];
    if (player) {
      Object.entries(player).forEach(([hex, card]) => {
        const placementHex = HexUtils.getID(validPlacementHexes(state, playerName as w.PlayerColor, card.type)[0]);
        state = playObject(state, playerName as w.PlayerColor, card, placementHex);
        state = transportObject(state, placementHex, hex);
      });
    }
  });

  state = applyAbilities(state);

  return state;
}

// Convenience method to generate a dummy action from text and parse, to easily run an arbitrary command.
export const action = (
  text: string,
  command: w.StringRepresentationOf<(state: w.GameState) => any> | Array<w.StringRepresentationOf<(state: w.GameState) => any>>
): w.CardInStore => ({
  metadata: { source: { type: 'builtin' } as w.CardSource },
  integrity: [],
  id: text,
  name: text,
  text,
  command,
  cost: 0,
  type: TYPE_EVENT
});
