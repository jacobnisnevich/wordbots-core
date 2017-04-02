// Client => itself

export const CONNECTING = 'ws:CONNECTING';
export const CONNECTED = 'ws:CONNECTED';
export const DISCONNECTED = 'ws:DISCONNECTED';
export const RECONNECT = 'ws:RECONNECT';

export function connecting() {
  return {
    type: CONNECTING
  };
}

export function connected(clientId) {
  return {
    type: CONNECTED,
    payload: { clientId }
  };
}

export function disconnected() {
  return {
    type: DISCONNECTED
  };
}

export function reconnect() {
  return {
    type: RECONNECT
  };
}

// Client => server

export const HOST = 'ws:HOST';
export const JOIN = 'ws:JOIN';
export const LEAVE = 'ws:LEAVE';
export const SET_USERNAME = 'ws:SET_USERNAME';
export const KEEPALIVE = 'ws:KEEPALIVE';

export function host(name, deck) {
  return {
    type: HOST,
    payload: { name, deck }
  };
}

export function join(id, name, deck) {
  return {
    type: JOIN,
    payload: { id, name, deck }
  };
}

export function leave() {
  return {
    type: LEAVE
  };
}


export function setUsername(username) {
  return {
    type: SET_USERNAME,
    payload: { username }
  };
}

export function keepalive() {
  return {
    type: KEEPALIVE
  };
}

// Client => server => client

export const CHAT = 'ws:CHAT';

export function chat(msg) {
  return {
    type: CHAT,
    payload: { msg }
  };
}

// Server => client

export const INFO = 'ws:INFO';
export const GAME_START = 'ws:GAME_START';
export const OPPONENT_LEFT = 'ws:OPPONENT_LEFT';
