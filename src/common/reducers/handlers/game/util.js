import { TYPE_CORE } from '../../../constants';
import vocabulary from '../../vocabulary/vocabulary';

export function currentPlayer(state) {
  return state.players[state.currentTurn];
}

export function opponentPlayer(state) {
  return state.players[opponentName(state)];
}

export function opponentName(state) {
  return (state.currentTurn == 'blue') ? 'orange' : 'blue';
}

export function allObjectsOnBoard(state) {
  return Object.assign({}, state.players.blue.robotsOnBoard, state.players.orange.robotsOnBoard);
}

export function ownerOf(state, object) {
  // TODO handle the case where neither player owns the object.
  const blueObjectIds = Object.values(state.players.blue.robotsOnBoard).map(obj => obj.id);
  return blueObjectIds.includes(object.id) ? state.players.blue : state.players.orange;
}

export function getAttribute(object, attr) {
  if (object.temporaryStatAdjustments && object.temporaryStatAdjustments[attr]) {
    // Apply all temporary adjustments, one at a time, in order.
    return object.temporaryStatAdjustments[attr].reduce((val, adj) => adj.func(val), object.stats[attr]);
  } else if (object.stats[attr] !== undefined) {
    return object.stats[attr];
  } else {
    return undefined;
  }
}

export function dealDamageToObjectAtHex(state, amount, hex) {
  const object = allObjectsOnBoard(state)[hex];
  object.stats.health -= amount;

  state = checkTriggers(state, 'afterDamageReceived', (trigger =>
    trigger.objects.map(o => o.id).includes(object.id)
  ));

  return updateOrDeleteObjectAtHex(state, object, hex);
}

export function updateOrDeleteObjectAtHex(state, object, hex) {
  const ownerName = (state.players.blue.robotsOnBoard[hex]) ? 'blue' : 'orange';

  if (getAttribute(object, 'health') > 0) {
    state.players[ownerName].robotsOnBoard[hex] = object;
  } else {
    delete state.players[ownerName].robotsOnBoard[hex];

    // Check victory conditions.
    if (object.card.type === TYPE_CORE) {
      state.winner = (ownerName == 'blue') ? 'orange' : 'blue';
    }
  }

  state = applyAbilities(state);

  return state;
}

/* eslint-disable no-unused-vars */
export function executeCmd(state, cmd, currentObject = null) {
  const actions = vocabulary.actions(state);
  const targets = vocabulary.targets(state, currentObject);
  const conditions = vocabulary.conditions(state);
  const triggers = vocabulary.triggers(state);
  const abilities = vocabulary.abilities(state);

  // Global methods
  const setTrigger = vocabulary.setTrigger(state, currentObject);
  const setAbility = vocabulary.setAbility(state, currentObject);
  const allTiles = vocabulary.allTiles(state);
  const cardsInHand = vocabulary.cardsInHand(state);
  const objectsInPlay = vocabulary.objectsInPlay(state);
  const objectsMatchingCondition = vocabulary.objectsMatchingCondition(state);
  const objectsMatchingConditions = vocabulary.objectsMatchingConditions(state);
  const attributeSum = vocabulary.attributeSum(state);
  const attributeValue = vocabulary.attributeValue(state);
  const count = vocabulary.count(state);

  eval(cmd)();
  return state;
}
/* eslint-enable no-unused-vars */

export function checkTriggers(state, triggerType, condition) {
  Object.values(allObjectsOnBoard(state)).forEach(function (obj) {
    (obj.triggers || []).forEach(function (t) {
      if (t.trigger.type == triggerType && condition(t.trigger)) {
        console.log('Executing ' + triggerType + ' trigger: ' + t.action);
        executeCmd(state, t.action, obj);
      }
    });
  });

  return state;
}

export function applyAbilities(state) {
  Object.values(allObjectsOnBoard(state)).forEach(function (obj) {
    (obj.abilities || []).forEach(function (ability) {
      // Unapply this ability for *all* objects.
      Object.values(allObjectsOnBoard(state)).forEach(function (otherObj) {
        ability.unapply(otherObj);
      });

      // Apply this ability to all targeted objects.
      ability.targets(state).forEach(function ([hex, targetObj]) { // TODO handle other kinds of targets.
        ability.apply(targetObj);
      });
    });
  });

  return state;
}
