import { collection } from '../../src/common/store/cards';
import { executeCmd } from '../../src/common/util/game';
import { getDefaultState } from '../testHelpers';

describe('Built-in cards', () => {
  it('should be playable without crashing', () => {
    const state = getDefaultState();

    const dummyCurrentObj = {
      id: 'orangeCore',
      stats: { attack: 1, health: 1, speed: 1 },
      abilities: [],
      triggers: []
    };

    collection.forEach(card => {
      const abilities = (card.abilities || []).concat(card.command || []);
      abilities.forEach(ability => {
        executeCmd(state, ability, dummyCurrentObj);
      });
    });
  });
});
