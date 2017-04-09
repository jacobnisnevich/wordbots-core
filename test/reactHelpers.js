import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { createRenderer } from 'react-test-renderer/shallow';
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as creator from '../src/common/containers/Creator';
import * as game from '../src/common/containers/Game';

injectTapEventPlugin();

export function renderElement(elt, deep = false) {
  if (deep) {
    return renderIntoDocument(elt);
  } else {
    const renderer = createRenderer();
    renderer.render(elt);
    return renderer.getRenderOutput();
  }
}

/* eslint-disable react/no-multi-comp */

export function createGame(state, dispatch = () => {}) {
  return React.createElement(game.Game, Object.assign(game.mapStateToProps(state), game.mapDispatchToProps(dispatch)));
}

function createCreator(state, dispatch = () => {}) {
  return React.createElement(creator.Creator, Object.assign(creator.mapStateToProps(state), creator.mapDispatchToProps(dispatch)));
}

/* eslint-enable react/no-multi-comp */

export function getComponent(type, componentClass, state, dispatch = () => {}, predicate = () => {}) {
  const gameElt = renderElement(instantiator(type)(state, dispatch), true);
  const components = scryRenderedComponentsWithType(gameElt, componentClass);
  return (components.length === 1) ? components[0] : components.find(predicate);
}

function instantiator(type) {
  return {
    'Game': createGame,
    'Creator': createCreator
  }[type];
}
