import { cloneDeep, groupBy, isString, times } from 'lodash';
import * as React from 'react';
import * as SafeJsonStringify from 'safe-json-stringify';
import * as seededRNG from 'seed-random';
import { shuffle } from 'seed-shuffle';

import ProfileLink from '../components/users/ProfileLink';
import { DECK_SIZE } from '../constants';
import defaultState, { bluePlayerState, orangePlayerState } from '../store/defaultGameState';
import * as w from '../types';

import { instantiateCard } from './cards';

/** Given an encoded Format, decode it and render its display name. */
export function renderFormatDisplayName(format: w.Format): string {
  return GameFormat.decode(format).displayName!;
}

/** Return whether a deck has exactly the given number of cards. */
function deckHasNCards(deck: w.DeckInGame, num: number): boolean {
  return deck.cards.length === num;
}

/** Return whether a deck has no more than a given number of copies of any individual card id. */
function deckHasAtMostNCopiesPerCard(deck: w.DeckInGame, maxNum: number): boolean {
  const cardCounts: number[] = Object.values(groupBy(deck.cards, 'id'))
    .map((cards) => cards.length);
  return cardCounts.every((count) => count <= maxNum);
}

/** Return whether a deck has only builtin cards. */
function deckHasOnlyBuiltinCards(deck: w.DeckInGame): boolean {
  return deck.cards.every((card) => card.metadata.source.type === 'builtin');
}

/** Return whether a deck is registered to the given set id AND all of its cards belong to that set. */
function deckBelongsToSet(deck: w.DeckInGame, set: w.Set): boolean {
  const cardIdsInSet: w.CardId[] = set.cards.map((c) => c.id);
  return deck.setId === set.id && deck.cardIds.every((id) => cardIdsInSet.includes(id));
}

/** Given a Set, render a fragment describing its provenance. */
function renderSetForFormatDescription(set: w.Set): React.ReactFragment {
  return (
    <React.Fragment>
      <a
        href={`/sets?set=${set.id}`}
        style={{
          fontStyle: 'italic',
          textDecoration: 'underline',
          color: '#666'
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {set.name}
      </a>
      {' '}set by{' '}
      <ProfileLink uid={set.metadata.authorId} username={set.metadata.authorName} />
    </React.Fragment>
  );
}

export class GameFormat {
  /** Decode an encoded Format into a `GameFormat`. */
  public static decode(encodedFormat: w.Format): GameFormat {
    let format: GameFormat | undefined;
    if (isString(encodedFormat)) {
      format = BUILTIN_FORMATS.find((m) => m.name === encodedFormat);
    } else if (encodedFormat && encodedFormat._type === 'set') {
      format = new SetFormat((encodedFormat).set);
    } else if (encodedFormat && encodedFormat._type === 'setDraft') {
      format = new SetDraftFormat((encodedFormat).set);
    }

    if (!format) {
      throw new Error(`Unknown game format: ${isString(encodedFormat) ? encodedFormat : SafeJsonStringify(encodedFormat)}`);
    }
    return format;
  }

  public name: string | undefined;
  public displayName: string | undefined;
  public description: string | undefined;

  /** Return the encoded representation of this format. (This is overridden by set-related formats.) */
  public serialized = (): w.Format => this.name as w.Format;

  /** Returns a rendered representation of this format. (This is overridden by set-related formats.) */
  public rendered = (): React.ReactNode => this.displayName;

  /** Returns whether a given deck is valid in this format. (Overridden by sub-classes.) */
  public isDeckValid = (_deck: w.DeckInGame): boolean => false;
  /** Returns whether this format requires a deck. (Can be overridden.) */
  public requiresDeck = true;

  /** Returns whether a given game state is using this format. */
  public isActive(state: w.GameState): boolean {
    return state.gameFormat === this.serialized();
  }

  /** Starts a game in this format.
    * GameFormat's startGame method performs only basic setup, to be overridden by subclasses. */
  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    _decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    state = {
      ...state,
      ...cloneDeep(defaultState),
      gameFormat: this.serialized(),
      player,
      rng: seededRNG(seed.toString()),
      started: true,
      usernames,
      options
    };

    return state;
  }
}

export const NormalGameFormat = new (class extends GameFormat {
  public name = 'normal';
  public displayName = 'Anything Goes';
  public description = 'The truly wild and crazy format for casual games with friends. Each player has a 30-card deck that has whatever cards they want, with no restrictions.';

  public isDeckValid = (deck: w.DeckInGame): boolean => deckHasNCards(deck, DECK_SIZE)

  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    state = super.startGame(state, player, usernames, decks, options, seed);

    state.players.blue = bluePlayerState(decks.blue);
    state.players.orange = orangePlayerState(decks.orange);

    return state;
  }
});

export const BuiltinOnlyGameFormat = new (class extends GameFormat {
  public name = 'builtinOnly';
  public displayName = 'Builtins Only';
  public description = 'Each player has a 30-card deck composed of only built-in cards (no custom cards allowed), with no more than two copies of each card per deck.';

  public isDeckValid = (deck: w.DeckInGame): boolean => (
    deckHasNCards(deck, DECK_SIZE) && deckHasOnlyBuiltinCards(deck) && deckHasAtMostNCopiesPerCard(deck, 2)
  )

  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    return NormalGameFormat.startGame(state, player, usernames, decks, options, seed);
  }
});

export const SharedDeckGameFormat = new (class extends GameFormat {
  public name = 'sharedDeck';
  public displayName = 'Mash-Up';
  public description = 'Unexpected but balanced fun. Each player\'s 30-card deck is shuffled together into a shared 60-card deck. No restrictions on cards – bring whatever deck you want.';

  public isDeckValid = (deck: w.DeckInGame): boolean => deckHasNCards(deck, DECK_SIZE);

  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    state = super.startGame(state, player, usernames, decks, options, seed);

    const deck = shuffle([...decks.blue, ...decks.orange], seed);
    // Give blue the top two cards, orange the next two (to form their starting hands),
    // and both players the rest of the deck.
    const [topTwo, nextTwo, restOfDeck] = [deck.slice(0, 2), deck.slice(2, 4), deck.slice(4)];

    state.players.blue = bluePlayerState([...topTwo, ...restOfDeck]);
    state.players.orange = orangePlayerState([...nextTwo, ...restOfDeck]);

    return state;
  }
});

export class SetFormat extends GameFormat {
  public static description = 'Only cards from a given set are allowed, with no more than two copies of each card per deck.';

  public name: string;
  public displayName: string;
  private set: w.Set;

  constructor(set: w.Set) {
    super();
    this.set = set;
    this.name = `set(${set.id})`;
    this.displayName = `Set: ${set.name} (by ${set.metadata.authorName})`;
  }

  public serialized = (): w.SetFormat => ({ _type: 'set', set: this.set });

  public rendered = (): React.ReactNode => (
    <div>
      {renderSetForFormatDescription(this.set)}
    </div>
  )

  public isDeckValid = (deck: w.DeckInGame): boolean => (
    deckHasNCards(deck, 30)
    && deckBelongsToSet(deck, this.set)
    && deckHasAtMostNCopiesPerCard(deck, 2)
  )

  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    return NormalGameFormat.startGame(state, player, usernames, decks, options, seed);
  }
}

export class SetDraftFormat extends GameFormat {
  public static description = 'Each player builds their deck at the start of the game by choosing from a random pool of cards in a given set.';

  public name: string;
  public displayName: string;
  public set: w.Set;

  constructor(set: w.Set) {
    super();
    this.set = set;
    this.name = `setDraft(${set.id})`;
    this.displayName = `Set Draft: ${set.name} (by ${set.metadata.authorName})${set.metadata.isPublished ? '' : ' (unpublished set)'}`;
  }

  public serialized = (): w.SetDraftFormat => ({ _type: 'setDraft', set: this.set });

  public rendered = (): React.ReactNode => (
    <div>
      <span>draft: </span>
      {renderSetForFormatDescription(this.set)}
    </div>
  )

  public requiresDeck = false;

  public startGame(
    state: w.GameState, player: w.PlayerColor, usernames: w.PerPlayer<string>,
    _decks: w.PerPlayer<w.PossiblyObfuscatedCard[]>, options: w.GameOptions, seed: number
  ): w.GameState {
    state = {
      ...state,
      ...cloneDeep(defaultState),
      gameFormat: this.serialized(),
      player,
      rng: seededRNG(seed.toString()),
      started: true,
      usernames,
      options,
      draft: this.initialDraftState(seed)
    };

    return state;
  }

  /** Returns the starting DraftState (i.e. no draft picks) given a seed and this format's set. */
  initialDraftState = (seed: number): w.DraftState => ({
    blue: {
      cardsDrafted: [],
      cardGroupsToShow: this.buildCardDraftGroups(seed)
    },
    orange: {
      cardsDrafted: [],
      cardGroupsToShow: this.buildCardDraftGroups(seed * 2)
    }
  })

  /** Given a seed, return 15 groups of 4 random cards from the set. */
  buildCardDraftGroups = (seed: number): w.CardInGame[][] => (
    times(15, (i) =>
      (shuffle(this.set.cards, seed + i * 0.01) as w.CardInStore[])
        .slice(0, 4)
        .map(instantiateCard)
    )
  )
}

export const BUILTIN_FORMATS = [
  SharedDeckGameFormat,
  BuiltinOnlyGameFormat,
  NormalGameFormat,
];
