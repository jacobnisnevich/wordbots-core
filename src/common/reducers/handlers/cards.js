import { compact } from 'lodash';

import { TYPE_EVENT, TYPE_ROBOT } from '../../constants';
import { id } from '../../util/common';
import {
  areIdenticalCards, cardsToJson, cardsFromJson, splitSentences, getSentencesFromInput, parse,
  loadCardsFromFirebase, loadDecksFromFirebase, saveCardsToFirebase, saveDecksToFirebase
} from '../../util/cards';

const cardsHandlers = {
  closeExportDialog: function (state) {
    return Object.assign({}, state, {exportedJson: null});
  },

  deleteCards: function (state, ids) {
    state.cards = state.cards.filter(c => !ids.includes(c.id));
    saveCardsToFirebase(state);
    return state;
  },

  deleteDeck: function (state, deckId) {
    state.decks = state.decks.filter(deck => deck.id !== deckId);
    saveDecksToFirebase(state);
    return state;
  },

  duplicateDeck: function (state, deckId) {
    const deck = state.decks.find(d => d.id === deckId);
    const copy = Object.assign({}, deck, {id: id(), name: `${deck.name} Copy`});

    state.decks.push(copy);
    saveDecksToFirebase(state);
    return state;
  },

  exportCards: function (state, cards) {
    return Object.assign({}, state, {exportedJson: cardsToJson(cards)});
  },

  importCards: function (state, json) {
    // Add new cards that are not duplicates.
    cardsFromJson(json)
      .filter(card => !state.cards.map(c => c.id).includes(card.id))
      .forEach(card => {
        const isEvent = card.type === TYPE_EVENT;
        const sentences = getSentencesFromInput(card.text);
        const parseResults = [];

        parse(sentences, isEvent ? 'event' : 'object', (idx, _, response) => {
          parseResults[idx] = response.js;

          // Are we done parsing?
          if (compact(parseResults).length === sentences.length) {
            card[isEvent ? 'command' : 'abilities'] = parseResults;
            state.cards.unshift(card);
            saveCardsToFirebase(state);
          }
        });
    });

    return state;
  },

  loadState: function (state, data) {
    state = loadCardsFromFirebase(state, data);
    state = loadDecksFromFirebase(state, data);
    return state;
  },

  openCardForEditing: function (state, card) {
    return Object.assign(state, {
      id: card.id,
      name: card.name,
      type: card.type,
      spriteID: card.spriteID,
      sentences: splitSentences(card.text).map(s => ({sentence: s, result: {}})),
      energy: card.cost,
      health: (card.stats || {}).health,
      speed: (card.stats || {}).speed,
      attack: (card.stats || {}).attack,
      text: card.text
    });
  },

  openDeckForEditing: function (state, deckId) {
    state.currentDeck = deckId ? state.decks.find(d => d.id === deckId) : null;
    return state;
  },

  saveCard: function (state, cardProps) {
    const card = createCardFromProps(cardProps);

    // Is there already a card with the same ID (i.e. we're currently editing it)
    // or that is identical to the saved card (i.e. we're replacing it with a card with the same name)?
    const existingCard = state.cards.find(c => c.id === cardProps.id || areIdenticalCards(c, card));

    if (existingCard) {
      // Editing an existing card.
      if (existingCard.source === 'builtin') {
        // TODO Log warning about not being about not being able to replace builtin cards.
      } else {
        Object.assign(existingCard, card, {id: existingCard.id});
      }
    } else {
      state.cards.push(card);
    }

    saveCardsToFirebase(state);

    return state;
  },

  saveDeck: function (state, deckId, name, cardIds = []) {
    if (deckId) {
      // Existing deck.
      const deck = state.decks.find(d => d.id === deckId);
      Object.assign(deck, { name, cardIds });
    } else {
      // New deck.
      state.decks.push({
        id: id(),
        name,
        cardIds
      });
    }

    saveDecksToFirebase(state);

    return state;
  }
};

// Converts card from cardCreator store format -> format for collection and game stores.
function createCardFromProps(props) {
  const sentences = props.sentences.filter(s => /\S/.test(s.sentence));
  const command = sentences.map(s => s.result.js);

  const card = {
    id: props.id || id(),
    name: props.name,
    type: props.type,
    spriteID: props.spriteID,
    text: sentences.map(s => `${s.sentence}. `).join(''),
    cost: props.cost,
    source: 'user',  // In the future, this will specify *which* user created the card.
    timestamp: Date.now()
  };

  if (props.type === TYPE_EVENT) {
    card.command = command;
  } else {
    card.abilities = command;
    card.stats = {
      health: props.health,
      speed: props.type === TYPE_ROBOT ? props.speed : undefined,
      attack: props.type === TYPE_ROBOT ? props.attack : undefined
    };
  }

  return card;
}

export default cardsHandlers;
