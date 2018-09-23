import * as fb from 'firebase';

import * as m from '../server/multiplayer/multiplayer';

/* Simple types */

export type Ability = PassiveAbility | TriggeredAbility | ActivatedAbility;
export type ActivatedAbility = any; // TODO
export type Attribute = 'attack' | 'health' | 'speed';
export type CardType = number;
export type Cause = string;
export type DeckId = string;
export type Format = 'normal' | 'builtinOnly' | 'sharedDeck';
export type HexId = string;
export type ParserMode = 'event' | 'object';
export type PassiveAbility = any; // TODO
export type PlayerColor = 'blue' | 'orange';
export type Target = any; // TODO
export type Targetable = CardInGame | _Object | HexId;
export type Trigger = any; // TODO
export type TriggeredAbility = any; // TODO

/* High-level types */

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type PerPlayer<T> = {
  [P in PlayerColor]: T
};

// Not actually typechecked but can be useful documentation for stringified functions.
type StringRepresentationOf<T> = string;

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

export type Card = CardInGame | CardInStore | ObfuscatedCard;

export interface CardInGame extends CardInStore {
  baseCost: number
  temporaryStatAdjustments?: {
    cost?: StatAdjustment[]
    attack?: StatAdjustment[]
    health?: StatAdjustment[]
    speed?: StatAdjustment[]
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
  parserV?: number | null
  timestamp?: number
}

export interface ObfuscatedCard {
  id: string
}

export interface Dictionary {
  definitions?: { [token: string]: any } // TODO more precise
  examplesByToken?: { [token: string]: string[] }
  examplesByNode?: { [token: string]: string[] }
}

export interface TutorialStep {
  idx: number
  numSteps: number
  [x: string]: any  // TODO Expose more field types as we need them
}

export interface SavedGame { // Interface for games stored in Firebase.
  players: { [ color: string ]: any } // TODO more precise
  format: Format,
  type: string, // TODO more precise
  winner: PlayerColor | null
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
  attack: number
  cost: number
  health: number
  id: string | null
  name: string
  parserVersion: number | null
  sentences: Sentence[]
  speed: number
  spriteID: string
  text: string
  type: CardType
}

export interface GameState {
  currentTurn: PlayerColor,
  gameFormat: Format
  options: GameOptions
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
  dictionary?: Dictionary
  renderId: number
  user: fb.User | null
}

export interface SocketState {
  chatMessages: ChatMessage[]
  clientId: m.ClientID | null
  connected: boolean
  connecting: boolean
  gameName: string | null
  games: m.Game[]
  hosting: boolean
  inQueue: number
  playersOnline: m.ClientID[]
  queuing: boolean
  userDataByClientId: Record<m.ClientID, m.UserData>
  waitingPlayers: m.GameWaitingForPlayers[]
}

/* Game state subcomponents */

export interface GameOptions {
  disableTurnTimer?: boolean
  passwordToJoin?: string
}

export interface PlayerInGameState {
  name: PlayerColor
  deck: Card[]
  discardPile: Card[]
  hand: Card[]
  robotsOnBoard: {
    [hexId: string]: _Object
  }
  [x: string]: any  // TODO Expose more field types as we need them
}

// Object is not a valid type name, but we want to export `types.Object`,
// so define it with the name `_Object` here and export it as `Object`.
interface _Object { // tslint:disable-line:class-name
  id: string
  type: CardType,
  card: CardInGame,
  stats: {
    attack?: number
    health: number
    speed?: number
  }
  temporaryStatAdjustments?: {
    attack?: StatAdjustment[]
    health?: StatAdjustment[]
    speed?: StatAdjustment[]
  }
  movesMade: number
  triggers: TriggeredAbility[]
  abilities: PassiveAbility[]
  activatedAbilities?: ActivatedAbility[]
  effects?: Effect[]
  cantActivate?: boolean
  attackedThisTurn?: boolean
  attackedLastTurn?: boolean
  movedThisTurn?: boolean
  movedLastTurn?: boolean
  beingDestroyed?: boolean
  isDestroyed?: boolean
  // TODO
}
export type Object = _Object;

export interface Robot extends _Object {
  type: 0
  cantAttack?: boolean
  cantMove?: boolean
  attackedThisTurn: boolean
  attackedLastTurn: boolean
  movedThisTurn: boolean
  movedLastTurn: boolean
}

export interface StatAdjustment {
  func: StringRepresentationOf<(attr: number) => number>
}

export interface Effect {
  effect: string
  props: any
}

/* Creator state subcomponents */

export interface Sentence {
  sentence: string
  result: ParseResult
}

export interface ParseResult {
  error?: string
  js?: StringRepresentationOf<() => void>
  // TODO
}

/* Socket state subcomponents */

export interface ChatMessage {
  text: string
  timestamp: number
  user: string
}
