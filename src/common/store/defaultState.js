import * as cards from './cards';

export const defaultState = {
  players: {
    blue: {
      health: 20,
      energy: {
        used: 0,
        total: 1
      },
      hand: [cards.attackBotCard, cards.concentrationCard],
      selectedCard: null,
      deck: [cards.tankBotCard, cards.tankBotCard, cards.tankBotCard],
      robotsOnBoard: {
        '-4,0,4': {
          hasMoved: false,
          card: cards.blueCoreCard,
          stats: cards.blueCoreCard.stats
        }
      }
    },
    orange: {
      health: 20,
      energy: {
        used: 0,
        total: 1
      },
      hand: [cards.attackBotCard, cards.concentrationCard],
      selectedCard: null,
      deck: [cards.tankBotCard, cards.tankBotCard, cards.tankBotCard],
      robotsOnBoard: {
        '4,0,-4': {
          hasMoved: false,
          card: cards.orangeCoreCard,
          stats: cards.orangeCoreCard.stats
        }
      }
    }
  },
  currentTurn: 'blue',
  selectedTile: null,
  placingRobot: false,
  hoveredCard: null,
  status: {
    message: '',
    type: ''
  },
  winner: null
}
