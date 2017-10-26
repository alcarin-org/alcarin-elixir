import {clone} from 'ramda';
import BaobabAdapterFactory from './store-adapter/baobab-adapter';
import {shallowEqual, patch, iterateOverCustomComponents} from './utils';
import {
  CustomComponentKey,
} from './const';

export function bootstrap(queryEl, jsxComponentFactory, store) {
  var lastVDom = null;
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  const storeAdapter = BaobabAdapterFactory(store, updateUI);
  const vdom = jsxComponentFactory();

  const dummyEl = document.createElement('div');
  element.append(dummyEl);

  const resolvedVDom = iterateOverCustomComponents(vdom, attachVNodeHooks);
  patch(dummyEl, resolvedVDom);
  return lastVDom = resolvedVDom;

  function updateUI() {
    console.log('-- update triggered')
    const vdom = iterateOverCustomComponents(jsxComponentFactory(), attachVNodeHooks);
    return lastVDom = patch(lastVDom, vdom);
  }

  function resolveNewCustomComponent(vCmpWrapper) {
    // vCmpWrapper.data.hook = Object.assign(vCmpWrapper.data.hook || {}, {
    //   init() { console.warn('init')},
    //   create() { console.warn('created')},
    // });

    const customCmp = vCmpWrapper[CustomComponentKey];
    if (customCmp.props.$state) {
      customCmp.stateListeners = customCmp.props.$state.map(storeAdapter.updateOnStorePath);
    }
    customCmp.state = resolveComponentState(customCmp.props.$state);
    const componentVNode = customCmp.factory(customCmp.props, customCmp.state);

    vCmpWrapper.children = [componentVNode];

    return componentVNode;
  }

  /**
   * we deferring resolve of Custom Components to prepatching moment.
   * when it's a time to replace Custom Componet vnode, we checking it
   * props and state. when they are same - we just returning last vdom.
   * in other case - we generating vdom for given Custom Component
   * (recursively, as Custom Component can have custom component children too)
   *
   * @param      {vNode}  vNode   The virtual node that tree will be considered
   * @return     {vNode}  The
   */
  function attachVNodeHooks(vNode) {
    vNode.data.hook = Object.assign(vNode.data.hook || {}, {
      init(initialVnode) {
        const resolvedCmpVNode = resolveNewCustomComponent(initialVnode);
        iterateOverCustomComponents(resolvedCmpVNode, attachVNodeHooks);
      },
      destroy(vCmpWrapper) {
        const customCmp = vCmpWrapper[CustomComponentKey];
        customCmp.stateListeners && customCmp.stateListeners.forEach((release) => release());
      },
      prepatch(vOrigCmpWrapper, vCmpWrapper) {
        const origCustomCmp = vOrigCmpWrapper[CustomComponentKey];
        const customCmp = vCmpWrapper[CustomComponentKey];

        customCmp.stateListeners = origCustomCmp.stateListeners;
        customCmp.state = resolveComponentState(customCmp.props.$state);

        const cmpStateUnchanged = shallowEqual(customCmp.props, origCustomCmp.props) &&
          shallowEqual(customCmp.state, origCustomCmp.state);

        if (cmpStateUnchanged) {
          return vCmpWrapper.children = vOrigCmpWrapper.children;
        }

        const customCmpVNode = customCmp.factory(customCmp.props, customCmp.state);
        const resolveCustomCmpVNode = iterateOverCustomComponents(customCmpVNode, attachVNodeHooks)
        vCmpWrapper.children = [resolveCustomCmpVNode];
      }
    });

    return vNode;
  }

  function resolveComponentState($state) {
    const state = {};
    if ($state) {
      for (let i = 0; i < $state.length; i++) {
        let path = $state[i];
        state[path] = storeAdapter.getState(path);
      }
    }
    return state;
  }
}
