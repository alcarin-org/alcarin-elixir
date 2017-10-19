import {init, h} from 'snabbdom';

export function connect(Component, stateMap, actionsMap) {
  return function ResultComponent(reduxStore, props) {
    const componentState = (stateMap && stateMap(reduxStore.getState())) || {};
    const componentActions = (actionsMap && actionsMap(reduxStore.dispatch)) || {};
    return Component(Object.assign(
      componentState,
      componentActions,
      props
    ));
  }
}

export function bootstrap(reduxStore, queryEl, Component, props = {}) {
  const patch = init([ // Init patch function with chosen modules
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default, // attaches event listeners
  ]);

  var lastVDom = null;

  reduxStore.subscribe(() => {
    const element = document.querySelector(queryEl);
    const vdom = Component(reduxStore, props);
    if (lastVDom) {
      return lastVDom = patch(lastVDom, vdom);
    }

    if (element) {
      const dummyEl = document.createElement('div');
      element.append(dummyEl);
      patch(dummyEl, vdom);
      return lastVDom = vdom;
    }

    throw new Error(`Can't find "${queryEl}".`);
  });
}
