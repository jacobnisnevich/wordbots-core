import { createStore, applyMiddleware, compose } from 'redux';
import multi from 'redux-multi';
import thunk from 'redux-thunk';

import { ALWAYS_ENABLE_DEV_TOOLS } from '../constants';
import promiseMiddleware from '../middleware/promiseMiddleware';
import createSocketMiddleware from '../middleware/socketMiddleware';
import rootReducer from '../reducers';
import * as socketActions from '../actions/socket';

const middlewareBuilder = () => {
  const universalMiddleware = [thunk, promiseMiddleware, multi];

  let middleware = {};
  let allComposeElements = [];

  if (process.browser) {
    const socketMiddleware = createSocketMiddleware({
      excludedActions: [socketActions.CONNECTING, socketActions.CONNECTED, socketActions.DISCONNECTED]
    });

    if ((process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') && !ALWAYS_ENABLE_DEV_TOOLS) {
      middleware = applyMiddleware(...universalMiddleware, socketMiddleware);
      allComposeElements = [middleware];
    } else {
      const createLogger = require('redux-logger').createLogger;
      const DevTools = require('../containers/DevTools').default;

      middleware = applyMiddleware(...universalMiddleware, socketMiddleware, createLogger());
      allComposeElements = [
        middleware,
        DevTools.instrument()
      ];

      // react-addons-perf unsupported as of React 16.0.0.
      // const Perf = require('react-addons-perf');
      // window.Perf = Perf;
    }
  } else {
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [middleware];
  }

  return allComposeElements;

};

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
