import { flatMap, has, some } from 'lodash';

import { allHexes, getHex, getAttribute, getAdjacentHexes } from '../util/game';
import HU from '../components/react-hexgrid/HexUtils';

// Conditions are all (hexId, obj) -> bool functions.
// They are used by the objectsMatchingConditions() collection.

export default function conditions(state) {
  return {
    adjacentTo: function (targets) {
      const targetHexIds = targets.type === 'objects' ? targets.entries.map(o => getHex(state, o)) : targets.entries;
      const neighborHexes = flatMap(targetHexIds, hid => getAdjacentHexes(HU.IDToHex(hid))).map(HU.getID);

      return ((hexId, obj) => neighborHexes.includes(hexId));
    },

    attributeComparison: function (attr, comp) {
      return ((hexId, obj) => comp(getAttribute(obj, attr)));
    },

    controlledBy: function (players) {
      const player = players.entries[0]; // Unpack player target.
      return ((hexId, obj) => has(player.robotsOnBoard, hexId));
    },

    hasProperty: function (property) {
      switch (property) {
        case 'attackedlastturn': return ((hexId, obj) => obj.attackedLastTurn);
        case 'attackedthisturn': return ((hexId, obj) => obj.attackedThisTurn);
        case 'movedlastturn': return ((hexId, obj) => obj.movedLastTurn);
        case 'movedthisturn': return ((hexId, obj) => obj.movedThisTurn);

        case 'isdamaged':
          return ((hexId, obj) => getAttribute(obj, 'health') < obj.card.stats.health);
      }
    },

    withinDistanceOf: function (distance, targets) {
      const targetHexIds = targets.type === 'objects' ? targets.entries.map(o => getHex(state, o)) : targets.entries;
      const nearbyHexIds = allHexes().filter(h1 => some(targetHexIds.map(HU.IDToHex), h2 => HU.distance(h1, h2) <= distance));

      return ((hexId, obj) => nearbyHexIds.includes(hexId));
    }
  };
}
