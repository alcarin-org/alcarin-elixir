import {init, h} from 'snabbdom';
import {initStore, listenOnStorePath} from './redux-adapter';
import {clone} from 'ramda';

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

export function bootstrap(store, queryEl, Component, props = {}) {
  initStore(store);

  const patch = init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/props').default,
    require('snabbdom/modules/style').default,
    require('snabbdom/modules/dataset').default,
    require('snabbdom/modules/eventlisteners').default,
    require('snabbdom/modules/attributes').default,
  ]);
  var lastVDom = null;

  const element = document.querySelector(queryEl);

  store.subscribe(() => {

  var vdom = Component(store, props);

  if (lastVDom) {
    vdom = resolveCustomComponents(vdom, (vNode) => {
      vNode.data.hook = Object.assign(vNode.data.hook || {}, {
        prepatch(oldVNode, vNode) {
          // get last params from "oldVNode" and compare to current params (with state incuded).
          // if nothing changed, reuse oldVNode children
          vNode.children = shallowEqual(oldVNode.lastDataState.props, vNode.data.props) ?
            oldVNode.children :
            [vNode.factory()];
          vNode.lastDataState = vNode.data;
        }
      });
      return vNode;
    });
    lastVDom = patch(lastVDom, vdom);
    return;
  }

  if (element) {
    const dummyEl = document.createElement('div');
    element.append(dummyEl);
    const resolvedVDom = resolveCustomComponents(vdom, (vNode) => {
      const realVNode = vNode.factory();
      delete vNode.factory;
      vNode.children = [realVNode];
      vNode.lastDataState = vNode.data;
      return realVNode;
    });
    patch(dummyEl, resolveCustomComponents(vdom));
    return lastVDom = vdom;
  }

  throw new Error(`Can't find "${queryEl}".`);
  });
}

function resolveCustomComponents(vNode, resolveFn) {
  if (!vNode) {
    return;
  }

  const stack = [vNode];

  while(stack.length > 0) {
    let realVNode = stack.pop();
    if (realVNode === undefined) {
      continue;
    }
    if (realVNode.factory) {
      realVNode = resolveFn(realVNode);
    }
    if (realVNode.children) {
      [].push.apply(stack, realVNode.children);
    }
  }

  return vNode;
}

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var aKeys = Object.keys(objA);
  var bKeys = Object.keys(objB);
  var len = aKeys.length;

  if (bKeys.length !== len) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    var key = aKeys[i];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};
