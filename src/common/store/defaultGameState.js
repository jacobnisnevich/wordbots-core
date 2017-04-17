import { BLUE_CORE_HEX, ORANGE_CORE_HEX } from '../constants';

import * as cards from './cards';

export function bluePlayerState(collection) {
  return playerState('blue', collection, cards.blueCoreCard, BLUE_CORE_HEX);
}

export function orangePlayerState(collection) {
  return playerState('orange', collection, cards.orangeCoreCard, ORANGE_CORE_HEX);
}

export function arbitraryPlayerState() {
  return bluePlayerState([]);
}

function playerState(color, collection, coreCard, coreHexId) {
  return {
    name: color,
    energy: {
      available: 1,
      total: 1
    },
    hand: collection.slice(0, 2),
    deck: collection.slice(2),
    collection: collection,
    robotsOnBoard: {
      [coreHexId]: {
        id: `${color}Core`,
        card: coreCard,
        stats: coreCard.stats,
        movesMade: 0,
        triggers: [],
        abilities: []
      }
    },
    selectedCard: null,
    selectedTile: null,
    status: {
      message: '',
      type: ''
    },
    target: {
      choosing: false,
      chosen: null,
      possibleCards: [],
      possibleHexes: []
    }
  };
}

const defaultState = {
  storeKey: 'game',
  started: false,
  players: {
    blue: bluePlayerState([]),
    orange: orangePlayerState([])
  },
  currentTurn: 'orange',
  player: 'orange',
  usernames: {},
  hoveredCard: null,
  winner: null,
  actionLog: []
};

export default defaultState;
