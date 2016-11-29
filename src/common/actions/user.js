import request from 'axios';
import config from '../../../package.json';
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CLEAR_COOKIE = 'CLEAR_COOKIE';

export function getUser(value) {
  return {
    type: GET_USER,
    payload: value
  };
}

export function getUserInfo(user) {
    console.log('From function getUserInfo');
    return {
        type: GET_USER_INFO,
        promise: request.get(`http://${config.apiHost}:${config.apiPort}/api/users/${user.userId}?access_token=${user.token}`)
    };
}


export function auth(username, password) {
    console.log('From function auth');
    return {
      type: LOGIN,
      promise: request.post(`http://${config.apiHost}:${config.apiPort}/api/users/login`, {username:username,password:password})
    };
}

export function logout(user) {
    return {
        type: LOGOUT,
        promise: request.post(`http://${config.apiHost}:${config.apiPort}/api/users/logout?access_token=${user.token}`)
    }
}

export function toogleClearCookie() {
    return {
        type: CLEAR_COOKIE
    };
}