import { cloneDeep, shuffle } from 'lodash';
import * as seededRNG from 'seed-random';

import { triggerSound } from '../util/game';

import defaultState, { bluePlayerState, orangePlayerState } from './defaultGameState';

export class GameFormat {
  name = undefined;
  displayName = undefined;
  description = undefined;

  static fromString(gameFormatStr) {
    const format = FORMATS.find(m => m.name === gameFormatStr);
    if (!format) {
      throw `Unknown game format: ${gameFormatStr}`;
    }
    return format;
  }

  isActive(state) {
    return state.gameFormat === this.name;
  }

  startGame(state, player, usernames, decks, seed) {
    state = Object.assign(state, cloneDeep(defaultState), {
      gameFormat: this.name,
      player: player,
      rng: seededRNG(seed),
      started: true,
      usernames
    });
    state = triggerSound(state, 'yourmove.wav');

    return state;
  }
}

export const NormalGameFormat = new (class extends GameFormat {
  name = 'normal';
  displayName = 'Normal';
  description = 'Each player has a 30-card deck. No restrictions on cards.';

  startGame(state, player, usernames, decks, seed) {
    state = super.startGame(state, player, usernames, decks, seed);

    state.players.blue = bluePlayerState(decks.blue);
    state.players.orange = orangePlayerState(decks.orange);

    return state;
  }
});

export const SharedDeckGameFormat = new (class extends GameFormat {
  name = 'sharedDeck';
  displayName = 'Shared Deck';
  description = 'Each player\'s 30-card deck is shuffled together into a shared 60-card deck. No restrictions on cards.';

  startGame(state, player, usernames, decks, seed) {
    state = super.startGame(state, player, usernames, decks, seed);

    const deck = shuffle([...decks.blue, ...decks.orange]);
    // Give blue the top two cards, orange the next two (to form their starting hands),
    // and both players the rest of the deck.
    const [topTwo, nextTwo, restOfDeck] = [deck.slice(0, 2), deck.slice(2, 4), deck.slice(4)];

    state.players.blue = bluePlayerState([...topTwo, ...restOfDeck]);
    state.players.orange = orangePlayerState([...nextTwo, ...restOfDeck]);

    return state;
  }
});

export const FORMATS = [NormalGameFormat, SharedDeckGameFormat];
