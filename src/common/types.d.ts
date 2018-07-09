import * as fb from 'firebase';

import { TYPE_ROBOT } from 'constants';

/* Simple types */

export type Attribute = 'attack' | 'health' | 'speed';
export type CardType = number;
export type DeckId = string;
export type Format = 'normal' | 'builtinOnly' | 'sharedDeck';
export type ParseResult = any; // TODO
export type ParserMode = 'event' | 'object';
export type PlayerColor = 'blue' | 'orange';

/* High-level types */

type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type PerPlayer<T> = {
  [P in PlayerColor]: T
};

/* Library types */

export type ActionType = string;
export type ActionPayload = any;

export interface Action {
  type: ActionType,
  payload: ActionPayload
}

/* General types */

export interface Deck extends DeckInStore {
  cards: CardInStore[]
}

export interface DeckInStore {
  id: DeckId
  name: string
  cardIds: string[]
}

export type Card = CardInGame | CardInStore;

export interface CardInGame extends CardInStore {
  baseCost: number
  temporaryStatAdjustments?: {
    cost?: [StatAdjustment]
    attack?: [StatAdjustment]
    health?: [StatAdjustment]
    speed?: [StatAdjustment]
  }
}

export interface CardInStore {
  id: string
  name: string
  img?: string  // Only kernels have images
  spriteID?: string
  cost: number
  type: CardType
  stats?: {
    attack?: number
    health: number
    speed?: number
  }
  text?: string
  abilities?: string[]
  command?: string | string[]
  source?: string
  spriteV?: number
  parserV?: number
  timestamp?: number
}

interface Object {
  id: string
  stats: {
    attack?: number
    health: number
    speed?: number
  }
  temporaryStatAdjustments?: {
    attack?: [StatAdjustment]
    health?: [StatAdjustment]
    speed?: [StatAdjustment]
  }
  effects?: [{
    effect: string
  }]
  // TODO
}

export type StatAdjustment = { func: (attr: number) => number }

export interface Robot extends Object {
  type: TYPE_ROBOT
  cantMove?: boolean
  movesMade: number
}

export interface PlayerInGameState {
  [x: string]: any  // TODO Expose more field types as we need them
}

export interface Dictionary {
  definitions?: { [token: string]: any } // TODO
  examplesByToken?: { [token: string]: string[] }
  examplesByNode?: { [token: string]: string[] }
}

export interface TutorialStep {
  idx: number
  numSteps: number
  [x: string]: any  // TODO Expose more field types as we need them
}

/* Redux store types */

export interface State {
  collection: CollectionState
  creator: CreatorState
  game: GameState
  global: GlobalState
  socket: SocketState,
  version: number
}

export interface CollectionState {
  cards: CardInStore[]
  decks: DeckInStore[]
  deckBeingEdited: DeckId | null
  exportedJson: string | null
  firebaseLoaded: boolean
}

export interface CreatorState {
  [x: string]: any  // TODO Expose more field types as we need them
}

export interface GameState {
  currentTurn: PlayerColor,
  gameFormat: Format
  player: PlayerColor,
  players: PerPlayer<PlayerInGameState>
  practice: boolean
  rng: () => number,
  sandbox: boolean
  started: boolean
  storeKey: 'game'
  tutorial: boolean
  usernames: PerPlayer<string> | {}
  winner: PlayerColor | null
  [x: string]: any  // TODO Expose more field types as we need them
}

export interface GlobalState {
  renderId: number
  user: fb.User | null
}

export interface SocketState {
  [x: string]: any  // TODO Expose more field types as we need them
}
