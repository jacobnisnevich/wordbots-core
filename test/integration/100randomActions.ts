// Generated with Randomizer.scala (RANDOM_DATA_GENERATOR_SEED=-5625824352629491544)
const actions = [
  "(function () { actions['forEach'](cardsInHand(targets['itP'](), 'anycard'), (function () { actions['canMoveAndAttackAgain'](targets['they']()); })); })",
  "(function () { actions['payEnergy'](targets['self'](), energyAmount(targets['self']())); })",
  "(function () { actions['takeControl'](targets['self'](), targets['it']()); })",
  "(function () { actions['payEnergy'](targets['allPlayers'](), ((attributeSum(cardsInHand(targets['theyP'](), 'event'), 'health')) * (count(cardsInHand(targets['controllerOf'](objectsMatchingConditions('kernel', [])), 'anycard'))))); })",
  "(function () { actions['removeAllAbilities'](targets['they']()); })",
  "(function () { save('duration', 3); (function () { actions['canMoveAndAttackAgain'](targets['they']()); })(); save('duration', null); })",
  "(function () { actions['modifyAttribute'](load('target'), 'attack', function (x) { return energyAmount(targets['allPlayers']()); }); })",
  "(function () { actions['giveAbility'](targets['it'](), \"(function () { setAbility(abilities['attributeAdjustment'](function () { return targets['choose'](cardsInDiscardPile(targets['itP'](), 'allobjects')); }, 'health', function (x) { return Math.ceil(x / count(allTiles())); })); })\"); })",
  "(function () { actions['discard'](targets['random'](energyAmount(targets['allPlayers']()), cardsInDiscardPile(targets['allPlayers'](), 'allobjects'))); })",
  "(function () { actions['become'](targets['it'](),targets['choose'](cardsInHand(targets['theyP'](), 'event')));})",
  "(function () { actions['endTurn'](); })",
  "(function () { actions['removeAllAbilities'](targets['thisRobot']()); })",
  "(function () { actions['moveObject'](targets['they'](), targets['that']()); })",
  "(function () { actions['canMoveAndAttackAgain'](targets['that']()); })",
  "(function () { actions['modifyEnergy'](targets['itP'](), function (x) { return x - attributeSum(cardsInDiscardPile(targets['allPlayers'](), 'allobjects'), 'cost'); }); })",
  "(function () { actions['destroy'](load('target')); })",
  "(function () { actions['discard'](targets['all'](cardsInDiscardPile(targets['opponent'](), 'anycard'))); })",
  "(function () { actions['forEach'](allTiles(), (function () { actions['canMoveAndAttackAgain'](targets['they']()); })); })",
  "(function () { actions['draw'](targets['self'](), attributeValue(targets['that'](), 'attack')); })",
  "(function () { actions['removeAllAbilities'](load('target')); })",
  "(function () { actions['modifyAttribute'](targets['choose'](other(other(other(objectsMatchingConditions('kernel', [conditions['unoccupied'](), conditions['adjacentTo'](load('target')), conditions['controlledBy'](targets['controllerOf'](targets['thisRobot']()))]))))), 'cost', function (x) { return 0; }); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['choose'](cardsInDiscardPile(targets['allPlayers'](), 'event')), targets['allPlayers']()); })",
  "(function () { actions['swapAttributes'](targets['choose'](objectsMatchingConditions('allobjects', [])), 'speed', 'speed'); })",
  "(function () { save('duration', 3); (function () { actions['moveObject'](targets['they'](), targets['that']()); })(); save('duration', null); })",
  "(function () { actions['removeAllAbilities'](targets['it']()); })",
  "(function () { actions['setAttribute'](targets['random'](3, cardsInHand(targets['self'](), 'anycard')), 'allattributes', \"(() => attributeSum(objectsMatchingConditions(['structure'], [conditions['controlledBy'](targets['controllerOf'](targets['all'](objectsMatchingConditions([], []))))]), 'attack'))\"); })",
  "(function () { actions['canMoveAgain'](load('target')); })",
  "(function () { actions['spawnObject'](targets['all'](cardsInHand(targets['allPlayers'](), 'allobjects')), allTiles(), targets['allPlayers']()); })",
  "(function () { actions['swapAttributes'](load('target'), 'attack', []); })",
  "(function () { actions['modifyAttribute'](load('target'), 'cost', function (x) { return Math.ceil(x / 1); }); })",
  "(function () { actions['modifyEnergy'](targets['itP'](), function (x) { return Math.ceil(x / 1); }); })",
  "(function () { actions['modifyAttribute'](targets['itP'](), 'attack', function (x) { return energyAmount(targets['allPlayers']()); }); })",
  "(function () { actions['forEach'](allTiles(), (function () { actions['modifyEnergy'](targets['theyP'](), function (x) { return Math.ceil(x / attributeValue(objectsMatchingConditions([], []), 'health')); }); })); })",
  "(function () { actions['swapAttributes'](targets['they'](), 'attack', 'attack'); })",
  "(function () { actions['discard'](targets['random'](2, cardsInHand(targets['self'](), 'structure'))); })",
  "(function () { actions['giveAbility'](load('target'), \"(function () { setAbility(abilities['applyEffect'](function () { return targets['that'](); }, 'cannotfightback')); })\"); })",
  "(function () { actions['draw'](targets['allPlayers'](), attributeSum(cardsInDiscardPile(targets['opponent'](), 'allobjects'), 'attack')); })",
  "(function () { actions['moveCardsToHand'](targets['all'](cardsInDiscardPile(targets['opponent'](), 'anycard')), targets['self']()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['all'](cardsInHand(targets['allPlayers'](), 'anycard')), targets['controllerOf'](targets['all'](objectsMatchingConditions('structure', [conditions['exactDistanceFrom'](attributeValue(targets['it'](), 'attack'), targets['choose'](objectsMatchingConditions('kernel', [])))])))); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['copyOf'](load('target')), targets['theyP']()); })",
  "(function () { actions['payEnergy'](targets['opponent'](), attributeSum(cardsInHand(targets['opponent'](), 'allobjects'), 'speed')); })",
  "(function () { actions['takeControl'](targets['theyP'](), targets['choose'](other(other(objectsMatchingConditions([], [conditions['unoccupied']()]))))); })",
  "(function () { actions['payEnergy'](targets['self'](), 0); })",
  "(function () { actions['modifyAttribute'](other(other(objectsMatchingConditions('robot', [conditions['hasProperty']('isdamaged'), conditions['exactDistanceFrom'](count(allTiles()), targets['thisRobot']())]))), 'allattributes', function (x) { return x - attributeSum(cardsInHand(targets['theyP'](), 'event'), 'speed'); }); })",
  "(function () { actions['dealDamage'](targets['it'](), attributeValue(other(objectsMatchingConditions('kernel', [conditions['exactDistanceFrom'](attributeValue(objectsMatchingConditions('allobjects', []), 'attack'), load('target'))])), 'cost')); })",
  "(function () { actions['draw'](targets['self'](), 0); })",
  "(function () { actions['forEach'](targets['allPlayers'](), (function () { actions['dealDamage'](targets['controllerOf'](load('target')), attributeValue(targets['it'](), 'attack')); })); })",
  "(function () { actions['canMoveAndAttackAgain'](targets['it']()); })",
  "(function () { actions['modifyEnergy'](targets['theyP'](), function (x) { return Math.floor(x / attributeValue(objectsMatchingConditions([], []), 'attack')); }); })",
  "(function () { actions['dealDamage'](targets['allPlayers'](), attributeValue(targets['choose'](objectsMatchingConditions('robot', [conditions['hasProperty']('isdamaged'), conditions['exactDistanceFrom'](count(allTiles()), targets['thisRobot']()), conditions['hasProperty']('movedlastturn'), conditions['controlledBy'](targets['controllerOf'](targets['they']()))])), 'cost')); })",
  "(function () { actions['canAttackAgain'](load('target')); })",
  "(function () { actions['modifyAttribute'](targets['random'](energyAmount(targets['itP']()), objectsMatchingConditions('robot', [])), 'allattributes', function (x) { return x - energyAmount(targets['allPlayers']()); }); })",
  "(function () { actions['returnToHand'](targets['it']()); })",
  "(function () { actions['payEnergy'](targets['controllerOf'](load('target')), attributeSum(cardsInDiscardPile(targets['opponent'](), 'allobjects'), 'attack')); })",
  "(function () { actions['canAttackAgain'](targets['thisRobot']()); })",
  "(function () { actions['discard'](targets['all'](cardsInDiscardPile(targets['allPlayers'](), 'structure'))); })",
  "(function () { save('target', allTiles()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['choose'](cardsInHand(targets['self'](), 'structure')), targets['allPlayers']()); })",
  "(function () { actions['modifyEnergy'](targets['allPlayers'](), function (x) { return x + attributeSum(cardsInDiscardPile(targets['opponent'](), 'anycard'), 'cost'); }); })",
  "(function () { actions['forEach'](allTiles(), (function () { actions['canAttackAgain'](targets['choose'](objectsMatchingConditions('kernel', [conditions['controlledBy'](targets['theyP']())]))); })); })",
  "(function () { actions['returnToHand'](targets['that']()); })",
  "(function () { actions['discard'](targets['copyOf'](targets['it']())); })",
  "(function () { actions['draw'](targets['allPlayers'](), 1); })",
  "(function () { actions['modifyAttribute'](targets['theyP'](), ['attack', 'health'], function (x) { return Math.floor(x / ((energyAmount(targets['theyP']())) * (3))); }); })",
  "(function () { actions['giveAbility'](targets['thisRobot'](), \"(function () { setAbility(abilities['activated'](function () { return targets['thisRobot'](); }, \\\"(function () { actions['swapAttributes'](targets['they'](), 'attack', 'attack'); })\\\")); })\"); })",
  "(function () { save('duration', 0); (function () { actions['setAttribute'](targets['opponent'](), [], \"(() => energyAmount(targets['allPlayers']()))\"); })(); save('duration', null); })",
  "(function () { actions['payEnergy'](targets['theyP'](), ((attributeValue(targets['they'](), 'health')) * (2))); })",
  "(function () { actions['discard'](targets['all'](cardsInDiscardPile(targets['opponent'](), 'allobjects'))); })",
  "(function () { actions['spawnObject'](targets['choose'](cardsInDiscardPile(targets['allPlayers'](), 'allobjects')), allTiles(), targets['theyP']()); })",
  "(function () { actions['modifyEnergy'](targets['self'](), function (x) { return x * attributeSum(cardsInHand(targets['self'](), 'robot'), 'cost'); }); })",
  "(function () { actions['removeAllAbilities'](targets['random'](0, objectsMatchingConditions(['kernel'], []))); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['random'](energyAmount(targets['itP']()), cardsInHand(targets['itP'](), 'event')), targets['self']()); })",
  "(function () { actions['moveObject'](targets['they'](), allTiles()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['all'](cardsInDiscardPile(targets['itP'](), 'kernel')), targets['controllerOf'](objectsMatchingConditions('kernel', []))); })",
  "(function () { actions['moveCardsToHand'](targets['all'](cardsInHand(targets['opponent'](), 'anycard')), targets['itP']()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['random'](count(targets['allPlayers']()), cardsInDiscardPile(targets['self'](), 'structure')), targets['opponent']()); })",
  "(function () { actions['giveAbility'](targets['it'](), \"(function () { setAbility(abilities['activated'](function () { return targets['thisRobot'](); }, \\\"(function () { actions['forEach'](allTiles(), (function () { actions['modifyEnergy'](targets['theyP'](), function (x) { return Math.ceil(x / attributeValue(objectsMatchingConditions([], []), 'health')); }); })); })\\\")); })\"); })",
  "(function () { save('target', load('target')); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['random'](attributeSum(cardsInDiscardPile(targets['theyP'](), 'robot'), 'health'), cardsInDiscardPile(targets['theyP'](), 'kernel')), targets['theyP']()); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['copyOf'](load('target')), targets['self']()); })",
  "(function () { actions['draw'](targets['itP'](), attributeValue(objectsMatchingConditions([], [conditions['hasProperty']('attackedthisturn'), conditions['adjacentTo'](load('target')), conditions['controlledBy'](targets['controllerOf'](targets['thisRobot']())), conditions['unoccupied'](), conditions['controlledBy'](targets['self']()), conditions['controlledBy'](targets['opponent']())]), 'speed')); })",
  "(function () { actions['modifyAttribute'](load('target'), 'speed', function (x) { return x + energyAmount(targets['theyP']()); }); })",
  "(function () { actions['swapAttributes'](other(other(other(other(objectsMatchingConditions(['allobjects'], [conditions['exactDistanceFrom'](2, other(other(objectsMatchingConditions('robot', []))))]))))), 'cost', 'attack'); })",
  "(function () { actions['setAttribute'](targets['that'](), 'attack', \"(() => attributeValue(targets['it'](), 'health'))\"); })",
  "(function () { actions['forEach'](cardsInDiscardPile(targets['itP'](), 'kernel'), (function () { actions['canMoveAgain'](load('target')); })); })",
  "(function () { actions['modifyEnergy'](targets['itP'](), function (x) { return Math.ceil(x / attributeSum(cardsInDiscardPile(targets['opponent'](), 'allobjects'), 'attack')); }); })",
  "(function () { actions['modifyAttribute'](targets['choose'](cardsInDiscardPile(targets['allPlayers'](), 'structure')), 'allattributes', function (x) { return x - attributeSum(cardsInHand(targets['theyP'](), 'event'), 'speed'); }); })",
  "(function () { actions['shuffleCardsIntoDeck'](targets['copyOf'](targets['it']()), targets['opponent']()); })",
  "(function () { actions['canMoveAndAttackAgain'](targets['they']()); })",
  "(function () { actions['moveCardsToHand'](targets['copyOf'](load('target')), targets['self']()); })",
  "(function () { actions['dealDamage'](targets['controllerOf'](load('target')), attributeValue(targets['it'](), 'attack')); })",
  "(function () { if (globalConditions['targetHasProperty'](targets['it'](), 'isdamaged')) { ((function () { actions['setAttribute'](targets['that'](), ['health', 'allattributes'], \"(() => ((2) * (attributeValue(targets['it'](), 'health'))))\"); }))(); } })",
  "(function () { actions['payEnergy'](targets['allPlayers'](), 1); })",
  "(function () { actions['removeAllAbilities'](targets['random'](3, objectsMatchingConditions(['kernel'], [conditions['unoccupied'](), conditions['withinDistanceOf'](attributeValue(targets['they'](), 'cost'), load('target'))]))); })",
  "(function () { save('target', targets['it']()); })",
  "(function () { actions['canMoveAgain'](targets['thisRobot']()); })",
  "(function () { actions['takeControl'](targets['theyP'](), load('target')); })",
  "(function () { actions['destroy'](targets['that']()); })",
  "(function () { actions['discard'](targets['random'](attributeSum(cardsInHand(targets['itP'](), 'structure'), 'attack'), cardsInHand(targets['theyP'](), 'allobjects'))); })",
  "(function () { actions['modifyAttribute'](targets['conditionOn'](targets['choose'](cardsInDiscardPile(targets['itP'](), 'anycard')), function () { return globalConditions['collectionExists'](targets['allPlayers'](), (function (x) { return x < attributeValue(objectsMatchingConditions([], []), 'health'); })); }), 'health', function (x) { return x + count(cardsInDiscardPile(targets['self'](), 'structure')); }); })"
];

export default actions;