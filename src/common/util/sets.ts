import { filter } from 'lodash';
import { shuffle } from 'seed-shuffle';

import * as w from '../types';

import { instantiateCard } from './cards';
import { nextSeed } from './common';

/** Given a set of cards (optionally with rarities) and random seeds, return 15 groups of 4 random cards from the set,
  * respecting certain rules for distribution of rarities if present (see `generateRarityDraftOrder`).
  * The `commonSeed` parameter is used to generate the rarity draft order, if any (identical between players for fairness),
  * while the `playerSeed` parameter is used to select the cards in each draft group (individual to each player). */
export function buildCardDraftGroups(
  cards: Array<w.CardInStore & { rarity?: w.CardInSetRarity }>,
  commonSeed: number,
  playerSeed: number
): Array<Array<w.CardInGame & { rarity?: w.CardInSetRarity }>> {
  const rarityDraftOrder = cards.some((c) => c.rarity) ? generateRarityDraftOrder(commonSeed) : new Array(15).fill(undefined);
  return rarityDraftOrder.map((rarity: w.CardInSetRarity | undefined, i) =>
    shuffle(rarity ? filter(cards, { rarity }) : cards, playerSeed + i * 0.01)
      .slice(0, 4)
      .map(instantiateCard)
  );
}

/** TODO docstring */
export function generateRarityDraftOrder(seed: number): w.CardInSetRarity[] {
  const seed1 = nextSeed(seed);
  const seed2 = nextSeed(seed1);

  const totalNumGroups = 15;

  // 55% chance of 1 rare group, 40% chance of 2 rare groups, 5% chance of 3 rare groups
  // -> minimum:   1 group  (= 2 cards = 6 1/3%)
  //    average: 1.5 groups (= 3 cards = 10%)
  //    maximum:   3 groups (= 6 cards = 20%)
  const numRareGroups =
    seed1 > .95
      ? 3
      : seed1 > .55
        ? 2
        : 1;

  // 55% chance of 3 uncommon group, 40% chance of 4 uncommon groups, 5% chance of 5 uncommon groups
  // -> minimum:   3 groups (=  6 cards = 20%)
  //    average: 3.5 groups (=  7 cards = 23 1/3%)
  //    maximum:   5 groups (= 10 cards = 33 1/3%)
  const numUncommonGroups =
    seed2 > .95
      ? 5
      : seed2 > .55
        ? 4
        : 3;

  // minimum: 15 - 5   - 3   =  7 groups (= 14 cards = 46 2/3%)
  // average: 15 - 3.5 - 1.5 = 10 groups (= 20 cards = 66 2/3%)
  // maximum: 15 - 3   - 1   = 11 groups (= 22 cards = 73 1/3%)
  const numCommonGroups = totalNumGroups - numUncommonGroups - numRareGroups;

  return shuffle([
    ...new Array(numRareGroups).fill('rare'),
    ...new Array(numUncommonGroups).fill('uncommon'),
    ...new Array(numCommonGroups).fill('common')
  ], seed);
}

/** TODO docstring */
export function symbolForRarity(rarity: w.CardInSetRarity): string {
  return ({
    'common': '●',
    'uncommon': '◆',
    'rare': '★'
  })[rarity];
}
