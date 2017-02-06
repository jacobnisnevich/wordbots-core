import * as cards from './cards';

const defaultState = {
  players: {
    blue: {
      energy: {
        available: 1,
        total: 1
      },
      hand: [cards.attackBotCard, cards.concentrationCard],
      deck: cards.deck,
      robotsOnBoard: {
        '-4,0,4': {
          hasMoved: false,
          card: cards.blueCoreCard,
          stats: cards.blueCoreCard.stats
        }
      }
    },
    orange: {
      energy: {
        available: 1,
        total: 1
      },
      hand: [cards.attackBotCard, cards.concentrationCard],
      deck: cards.deck,
      robotsOnBoard: {
        '4,0,-4': {
          hasMoved: false,
          card: cards.orangeCoreCard,
          stats: cards.orangeCoreCard.stats
        }
      }
    }
  },
  currentTurn: 'orange',
  selectedTile: null,
  selectedCard: null,
  playingCardType: null,
  hoveredCard: null,
  status: {
    message: '',
    type: ''
  },
  target: {
    choosing: false,
    chosen: null,
    possibleHexes: []
  },
  winner: null
};

export default defaultState;
