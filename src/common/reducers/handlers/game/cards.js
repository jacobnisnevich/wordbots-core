import { cloneDeep, isArray } from 'lodash';

import { TYPE_EVENT } from '../../../constants';
import {
  currentPlayer, getCost, checkVictoryConditions,
  validPlacementHexes,
  discardCards, logAction,
  executeCmd, triggerEvent, applyAbilities
} from '../../../util/game';
import { arbitraryPlayerState } from '../../../store/defaultGameState';
import HexUtils from '../../../components/react-hexgrid/HexUtils';

export function setSelectedCard(state, playerName, cardIdx) {
  const player = state.players[playerName];
  const isCurrentPlayer = (playerName === state.currentTurn);
  const selectedCard = player.hand[cardIdx];
  const energy = player.energy;

  player.selectedTile = null;

  if (isCurrentPlayer &&
      player.target.choosing &&
      player.target.possibleCards.includes(selectedCard.id) &&
      player.selectedCard !== null) {
    // Target chosen for a queued action.
    return setTargetAndExecuteQueuedAction(state, selectedCard);
  } else {
    // Toggle card selection.

    if (player.selectedCard === cardIdx) {
      // Clicked on already selected card => Deselect or play event

      if (isCurrentPlayer && selectedCard.type === TYPE_EVENT && getCost(selectedCard) <= energy.available) {
        return playEvent(state, cardIdx);
      } else {
        player.selectedCard = null;
        player.status.message = '';
      }
    } else {
      // Clicked on unselected card => Select

      player.selectedCard = cardIdx;
      player.target.choosing = false; // Reset targeting state.

      if (getCost(selectedCard) <= energy.available) {
        player.status.message = (selectedCard.type === TYPE_EVENT) ? 'Click this event again to play it.' : 'Select an available tile to play this card.';
        player.status.type = 'text';
      } else {
        player.status.message = 'You do not have enough energy to play this card.';
        player.status.type = 'error';
      }
    }

    return state;
  }
}

export function placeCard(state, cardIdx, tile) {
  // Work on a copy of the state in case we have to rollback
  // (if a target needs to be selected for an afterPlayed trigger).
  let tempState = cloneDeep(state);

  const player = currentPlayer(tempState);
  const card = player.hand[cardIdx];
  const timestamp = Date.now();

  if (player.energy.available >= getCost(card) &&
      validPlacementHexes(state, player.name, card.type).map(HexUtils.getID).includes(tile)) {
    const playedObject = {
      id: Math.random().toString(36),
      card: card,
      stats: Object.assign({}, card.stats),
      triggers: [],
      movesMade: 0,
      cantMove: true,
      justPlayed: true  // This flag is needed to, e.g. prevent objects from being able to
                        // target themselves for afterPlayed triggers.
    };

    player.robotsOnBoard[tile] = playedObject;
    player.energy.available -= getCost(card);
    player.selectedCard = null;
    player.status.message = '';

    if (card.abilities.length > 0) {
      card.abilities.forEach((cmd) => executeCmd(tempState, cmd, playedObject));
    }

    tempState = discardCards(tempState, [card]);
    tempState = triggerEvent(tempState, 'afterPlayed', {object: playedObject});
    tempState = applyAbilities(tempState);
    tempState = logAction(tempState, player, `played |${card.name}|`, {[card.name]: card}, timestamp);

    playedObject.justPlayed = false;
  }

  if (player.target.choosing) {
    // Target still needs to be selected, so roll back playing the card (and return old state).

    currentPlayer(state).target = player.target;
    currentPlayer(state).status = {
      message: `Choose a target for ${card.name}'s ability.`,
      type: 'text'
    };

    state.placementTile = tile;  // Store the tile the object was played on, for the actual placement later.
    return state;
  } else {
    // Apply abilities one more time, in case the current object needs to be targeted by any abilities.
    // Recall that the played object was previously marked as justPlayed, to prevent it from being able to target itself.
    tempState = applyAbilities(tempState);
    return tempState;
  }
}

export function playEvent(state, cardIdx, command) {
  const player = currentPlayer(state);
  const card = player.hand[cardIdx];
  const cmd = card.command;
  const timestamp = Date.now();

  if (player.energy.available >= getCost(card)) {
    // Cards cannot target themselves, so temporarily set justPlayed = true before executing the command.
    card.justPlayed = true;

    (isArray(cmd) ? cmd : [cmd]).forEach((subcmd) => {
      if (!player.target.choosing) {
        executeCmd(state, subcmd);
      }
    });

    card.justPlayed = false;

    if (player.target.choosing) {
      player.status = { message: `Choose a target for ${card.name}.`, type: 'text' };
    } else {
      state = discardCards(state, [card]);
      state = logAction(state, player, `played |${card.name}|`, {[card.name]: card}, timestamp);

      player.status.message = '';
      player.selectedCard = null;
      player.energy.available -= getCost(card);
    }
  }
  state = checkVictoryConditions(state);

  return state;
}

export function setTargetAndExecuteQueuedAction(state, target) {
  const player = currentPlayer(state);

  // Select target tile for event or afterPlayed trigger.
  player.target = {
    chosen: [target],
    choosing: false,
    possibleHexes: [],
    possibleCards: []
  };

  // Perform the trigger.
  const card = player.hand[player.selectedCard];
  if (card.type === TYPE_EVENT) {
    state = playEvent(state, player.selectedCard);
  } else {
    state = placeCard(state, player.selectedCard, state.placementTile);
  }

  // Reset target.
  state.players[player.name].target = arbitraryPlayerState().target;

  return state;
}
