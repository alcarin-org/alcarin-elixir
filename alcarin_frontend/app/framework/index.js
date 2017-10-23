import {clone} from 'ramda';
import ReduxAdapterFactory from './redux-adapter';
import {shallowEqual, patch} from './utils';

const EmptyObject = {};

var lastVDom = null;
var rootComponentFactory = null;
var storeAdapter = null;

export function bootstrap(queryEl, jsxComponentFactory, store) {
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  storeAdapter = ReduxAdapterFactory(store);
  rootComponentFactory = jsxComponentFactory;

  var vdom = rootComponentFactory();

  const dummyEl = document.createElement('div');
  element.append(dummyEl);
  const resolvedVDom = resolveCustomComponents(vdom, (vNode) => {
    console.log('****creating', vNode)
    const realVNode = vNode.factory();
    delete vNode.factory;
    vNode.children = [realVNode];

    vNode.lastPropsState = vNode.data.props;
    vNode.lastDataState = EmptyObject;
    if (vNode.lastPropsState.$state) {
      console.log(`$state found`)
      vNode.stateListeners = vNode.lastPropsState.$state.map(
        (path) => storeAdapter.listenOnStorePath(path, () => {
          console.warn('path', path, 'changed');
          setTimeout(update, 0);
        })
      );
    }
    return realVNode;
  });
  patch(dummyEl, resolveCustomComponents(vdom));
  return lastVDom = vdom;
}

function update() {
  if (!lastVDom) {
    throw new Error('Update called before bootstrap');
  }
  console.log('------------ updating all...');

  // we defer resolving of Custom Components to prepatching moment.
  // when it's a time to replace Custom Componet vnode, we checking it
  // props and state. when they are same - we just returning last vdom.
  // in other case - we generating vdom for given Custom Component
  // (recursively, as Custom Component can have custom component children too)
  const vdom = resolveCustomComponents(rootComponentFactory(), attachPrepatchHook);
  return lastVDom = patch(lastVDom, vdom);
}

function attachPrepatchHook(vNode) {
  vNode.data.hook = Object.assign(vNode.data.hook || {}, {
    prepatch(oldVNode, vNode) {
      // get last params from "oldVNode" and compare to current params (with state incuded).
      // if nothing changed, reuse oldVNode children
      console.log('Time to prepatch: ', clone(oldVNode), clone(vNode));

      if (oldVNode.stateListeners) {
        console.log('Found state listeners, re-attaching')
        // oldVNode.stateListeners.forEach((off) => off());
        vNode.stateListeners = oldVNode.stateLiseners;
        delete oldVNode.stateListeners;
      }

      const state = {};
      if (vNode.data.props.$state) {
        for (let i = 0; i < vNode.data.props.$state.length; i++) {
          let path = vNode.data.props.$state[i];
          state[path] = storeAdapter.getState(path);
        }
        delete vNode.data.props.$state;
      }

      const stateNotChanged = shallowEqual(oldVNode.lastPropsState, vNode.data.props) &&
        shallowEqual(oldVNode.lastDataState, state);
      vNode.children = stateNotChanged ? oldVNode.children : [
        resolveCustomComponents(vNode.factory(state), attachPrepatchHook)
      ];

      vNode.lastPropsState = vNode.data.props;
      vNode.lastDataState = state;
    }
  });

  return vNode;
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
      const cmpName = realVNode.factory.name;
      let origVNode = realVNode;
      realVNode = resolveFn(realVNode);
    }
    if (realVNode.children) {
      [].push.apply(stack, realVNode.children);
    }
  }

  return vNode;
}
