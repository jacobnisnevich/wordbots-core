/*eslint-disable import/no-unassigned-import */
import 'babel-core/register';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createHistory from 'history/createBrowserHistory';

import App from '../common/containers/App';
import configureStore from '../common/store/configureStore';
import '../../styles/index.css';
/* eslint-enable import/no-unassigned-import */

const rootElement = document.getElementById('root');
const initialState = window.__INITIAL_STATE__;

const history = createHistory();
const store = configureStore(initialState);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement
);
