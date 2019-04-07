import { isArray, reduce } from 'lodash';

import * as collectionActions from '../actions/collection';
import * as creatorActions from '../actions/creator';
import * as globalActions from '../actions/global';
import defaultState from '../store/defaultCollectionState';
import * as w from '../types';

import c from './handlers/cards';

type State = w.CollectionState;

export default function collection(oldState: State = defaultState, action: w.Action): State {
  const state = Object.assign({}, oldState);

  if (isArray(action)) {
    // Allow multiple dispatch - this is primarily useful for simplifying testing.
    return reduce(action, collection, state);
  } else {
    switch (action.type) {
      case globalActions.FIREBASE_DATA:
        return c.loadState({...state, firebaseLoaded: true}, action.payload.data);

      case creatorActions.ADD_TO_COLLECTION:
        return c.saveCard(state, action.payload);

      case collectionActions.DELETE_DECK:
        return c.deleteDeck(state, action.payload.deckId);

      case collectionActions.DELETE_SET:
        return c.deleteSet(state, action.payload.setId);

      case collectionActions.DUPLICATE_DECK:
        return c.duplicateDeck(state, action.payload.deckId);

      case collectionActions.EDIT_DECK:
        return c.openDeckForEditing(state, action.payload.deckId);

      case collectionActions.EDIT_SET:
        return c.openSetForEditing(state, action.payload.setId);

      case collectionActions.EXPORT_CARDS:
        return c.exportCards(state, action.payload.cards);

      case collectionActions.IMPORT_CARDS:
        return c.importCards(state, action.payload.json);

      case collectionActions.REMOVE_FROM_COLLECTION:
        return c.deleteCards(state, action.payload.ids);

      case collectionActions.SAVE_DECK:
        return c.saveDeck(state, action.payload.id, action.payload.name, action.payload.cardIds, action.payload.setId);

      case collectionActions.SAVE_SET:
        return c.saveSet(state, action.payload.set);

      case collectionActions.PUBLISH_SET:
        return c.publishSet(state, action.payload.setId);

      default:
        return state;
    }
  }
}
