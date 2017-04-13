export const START_GAME = 'START_GAME';
export const NEW_GAME = 'NEW_GAME';
export const MOVE_ROBOT = 'MOVE_ROBOT';
export const ATTACK = 'ATTACK';
export const MOVE_ROBOT_AND_ATTACK = 'MOVE_ROBOT_AND_ATTACK';
export const PLACE_CARD = 'PLACE_CARD';
export const PASS_TURN = 'PASS_TURN';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_SELECTED_TILE = 'SET_SELECTED_TILE';
export const SET_HOVERED_CARD = 'SET_HOVERED_CARD';
export const SET_HOVERED_TILE = 'SET_HOVERED_TILE';

export function startGame(decks) {
  return {
    type: START_GAME,
    payload: { decks }
  };
}

export function newGame() {
  return {
    type: NEW_GAME
  };
}

export function moveRobot(from, to) {
  return {
    type: MOVE_ROBOT,
    payload: { from, to }
  };
}

export function attack(source, target) {
  return {
    type: ATTACK,
    payload: { source, target }
  };
}

export function moveRobotAndAttack(from, to, target) {
  return {
    type: MOVE_ROBOT_AND_ATTACK,
    payload: { from, to, target }
  };
}

export function placeCard(tile, cardIdx) {
  return {
    type: PLACE_CARD,
    payload: { tile, cardIdx }
  };
}

export function passTurn(player) {
  return {
    type: PASS_TURN,
    payload: { player }
  };
}

export function setSelectedCard(selectedCard, player) {
  return {
    type: SET_SELECTED_CARD,
    payload: { selectedCard, player }
  };
}

export function setSelectedTile(selectedTile, player) {
  return {
    type: SET_SELECTED_TILE,
    payload: { selectedTile, player }
  };
}

export function setHoveredCard(hoveredCard) {
  return {
    type: SET_HOVERED_CARD,
    payload: { hoveredCard }
  };
}

export function setHoveredTile(hoveredCard) {
  return {
    type: SET_HOVERED_TILE,
    payload: { hoveredCard }
  };
}
