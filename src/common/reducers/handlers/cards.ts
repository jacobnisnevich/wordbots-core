import { isUndefined, omitBy, pick } from 'lodash';

import * as w from '../../types';
import {
  cardsFromJson, cardsToJson, createCardFromProps, loadCardsFromFirebase,
  loadDecksFromFirebase, loadSetsFromFirebase, splitSentences
} from '../../util/cards';
import { id, logToDiscord } from '../../util/common';
import * as firebase from '../../util/firebase';

type State = w.CollectionState;

const cardsHandlers = {
  deleteCards: (state: State, ids: string[]): State => {
    state.cards = state.cards.filter((c: w.CardInStore) => !ids.includes(c.id));
    firebase.removeCards(ids);
    return state;
  },

  deleteDeck: (state: State, deckId: string): State => {
    state.decks = state.decks.filter((deck: w.DeckInStore) => deck.id !== deckId);
    firebase.removeDeck(deckId);
    return state;
  },

  deleteSet: (state: State, setId: string): State => {
    firebase.removeSet(setId);
    return {
      ...state,
      sets: state.sets.filter((set: w.Set) => set.id !== setId)
    };
  },

  duplicateCard: (state: State, originalCard: w.CardInStore): State => {
    const currentUser = firebase.lookupCurrentUser();

    if (currentUser) {
      const duplicateCard: w.CardInStore = {
        ...originalCard,
        id: id(),
        name: `Copy of ${originalCard.name}`,
        metadata: {
          ownerId: currentUser.uid,
          source: { type: 'user', uid: currentUser.uid, username: currentUser.displayName! },
          created: Date.now(),
          updated: Date.now(),
          duplicatedFromCard: {
            id: originalCard.id,
            name: originalCard.name,
            metadata: originalCard.metadata
          },
          isPrivate: false,
          disallowInEverythingDraft: originalCard.metadata.disallowInEverythingDraft
        }
      };

      saveCard(state, duplicateCard);
    }

    return state;
  },

  duplicateDeck: (state: State, deckId: string): State => {
    const deck = state.decks.find((d) => d.id === deckId);
    const currentUser = firebase.lookupCurrentUser();

    if (deck && currentUser) {
      const copy: w.DeckInStore = {
        ...deck,
        id: id(),
        authorId: currentUser.uid,
        name: `${deck.name} Copy`,
        timestamp: Date.now()
      };

      state.decks.push(copy);
      firebase.saveDeck(copy);
    }

    return state;
  },

  duplicateSet: (state: State, setId: string): State => {
    const set: w.Set = state.sets.find((d) => d.id === setId)!;
    const versionMatch = set.name.match(/v(\d+)$/);
    const version: number = versionMatch && parseInt(versionMatch[1], 10) || 1;

    const copy: w.Set = {
      ...set,
      id: id(),
      name: `${set.name.split(/v(\d+)$/)[0]} v${version + 1}`,
      metadata: {
        ...set.metadata,
        isPublished: false,
        lastModified: Date.now()
      }
    };

    firebase.saveSet(copy);
    return {
      ...state,
      sets: [...state.sets, copy]
    };
  },

  exportCards: (state: State, cards: w.CardInStore[]): State => ({ ...state, exportedJson: cardsToJson(cards) }),

  importCards: (state: State, json: string): State => {
    cardsFromJson(json, (card) => { saveCard(state, card); });
    return state;
  },

  loadState: (state: State, data: any): State => {
    const defaultDecks: w.DeckInStore[] = state.decks.filter((deck) => deck.id.startsWith('[default-'));

    state = loadCardsFromFirebase(state, data);
    state = loadDecksFromFirebase(state, data);
    state = loadSetsFromFirebase(state, data);

    defaultDecks.forEach((defaultDeck) => {
      if (!state.decks.find((deck) => deck.id === defaultDeck.id)) {
        state.decks.push(defaultDeck);
      }
    });

    return state;
  },

  openCardForEditing: (state: w.CreatorState, card: w.CardInStore): w.CreatorState => {
    const newFields: Partial<w.CreatorState> = {
      ...pick(card, ['id', 'name', 'type', 'text', 'cost', 'spriteID', 'flavorText']),
      health: card.stats?.health,
      speed: card.stats?.speed,
      attack: card.stats?.attack,
      sentences: splitSentences(card.text || '').map((s) => ({ sentence: s, result: null }))
    };

    return { ...state, ...omitBy(newFields, isUndefined) };
  },

  openDeckForEditing: (state: State, deckId: string): State => {
    state.deckBeingEdited = deckId ? state.decks.find((d) => d.id === deckId)! : null;
    return state;
  },

  openSetForEditing: (state: State, setId: string): State => ({
    ...state,
    setBeingEdited: setId && state.sets.find((s) => s.id === setId) || null
  }),

  publishSet: (state: State, setId: string): State => {
    const set: w.Set | undefined = state.sets.find((s) => s.id === setId);

    if (!set) {
      return state;
    }

    const publishedSet: w.Set = { ...set, metadata: { ...set.metadata, isPublished: true } };
    firebase.saveSet(publishedSet);

    return {
      ...state,
      sets: [...state.sets.filter((s) => s.id !== setId), publishedSet]
    };
  },

  saveCard: (state: State, cardProps: w.CreatorState): State => {
    const card = createCardFromProps(cardProps);
    return saveCard(state, card);
  },

  // e.g. used when importing a card from the RecentCardsCarousel
  saveExistingCard: (state: State, card: w.CardInStore): State => {
    const user = firebase.lookupCurrentUser();

    if (user) {
      const copy: w.CardInStore = {
        ...card,
        id: id(),  // generate a new ID so the card gets saved in a new place in Firebase
        metadata: {
          ...card.metadata,
          ownerId: user.uid,  // this copy of the card is owned by the current user
          updated: Date.now()  // set updated date to Date.now() so the card is easy to find
        }
      };
      return saveCard(state, copy);
    } else {
      return state;
    }
  },

  saveDeck: (state: State, deckId: string, name: string, cardIds: string[] = [], setId: string | null = null): State => {
    const user = firebase.lookupCurrentUser();

    if (user) {
      if (deckId) {
        // Existing deck.
        const deck: w.DeckInStore | undefined = state.decks.find((d) => d.id === deckId);

        if (deck) {
          Object.assign(deck, { name, cardIds });
          firebase.saveDeck(deck);
        }
      } else {
        const deck: w.DeckInStore = {
          id: id(),
          authorId: user.uid,
          name,
          cardIds,
          timestamp: Date.now(),
          setId
        };

        state.decks.push(deck);
        firebase.saveDeck(deck);

        logToDiscord(`:scroll: New deck created: **${deck.name}** by ${user.displayName} (https://${window.location.hostname}/deck/${deck.id})`);
      }
    }

    return state;
  },

  saveSet: (state: State, set: w.Set): State => {
    firebase.saveSet(set);

    if (!state.sets.find((s) => s.id === set.id)) {
      const user = firebase.lookupCurrentUser();
      logToDiscord(`:large_blue_diamond: New set created: **${set.name}** by ${user?.displayName} (https://${window.location.hostname}/sets/?set=${set.id})`);
    }

    return {
      ...state,
      sets: [...state.sets.filter((s) => s.id !== set.id), set]
    };
  }
};

// Saves a card to Redux and Firebase, either as a new card or replacing an existing card.
function saveCard(state: State, card: w.CardInStore): State {
  // Is there already a card with the same ID (i.e. we're currently editing it)?
  const existingCard = state.cards.find((c) => c.id === card.id);

  // (Users cannot have two different cards with the same name.)
  if (state.cards.find((c) => c.name.trim() === card.name.trim() && c.id !== existingCard?.id)) {
    alert(`Can't save a card with the name '${card.name.trim()}' because you already have a card with that name!`);
    return state;
  }

  if (existingCard) {
    // Editing an existing card.
    const { source, duplicatedFromCard } = existingCard.metadata;

    // (Cards that are duplicates can't be named back to the original name (e.g. "Copy of A" => "A")
    // because that would be confusing / make misattribution too easy.)
    if (duplicatedFromCard && card.name.trim() === duplicatedFromCard.name.trim()) {
      alert(`Can't save this card with the name '${card.name.trim()}' because it is a copy of a card with that name!`);
      return state;
    }

    if (source?.type !== 'builtin' && source?.uid === firebase.lookupCurrentUser()!.uid) {
      card = {
        ...card,
        id: existingCard.id,
        // Only the 'updated' property in card metadata can be overwritten by editing a card
        metadata: { ...existingCard.metadata, updated: Date.now() }
      };

      Object.assign(existingCard, card);
    } else {
      alert('Can\'t edit this card! Maybe it\'s a built-in card or a card that doesn\'t belong to you?');
      return state;
    }
  } else {
    // Creating a new card.
    state.cards.push(card);

    const user = firebase.lookupCurrentUser();
    logToDiscord(`:flower_playing_cards: New card created: **${card.name}** by ${user?.displayName} (https://${window.location.hostname}/card/${card.id})`);
  }

  firebase.saveCard(card);
  return state;
}

export default cardsHandlers;
