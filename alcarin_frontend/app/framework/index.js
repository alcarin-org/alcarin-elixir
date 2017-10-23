import {clone} from 'ramda';
import ReduxAdapterFactory from './redux-adapter';
import {shallowEqual, patch, iterateOverCustomComponents} from './utils';
import {
  CustomComponentKey,
  EmptyArray,
} from './const';

export function bootstrap(queryEl, jsxComponentFactory, store) {
  var lastVDom = null;
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  const storeAdapter = ReduxAdapterFactory(store);
  const vdom = jsxComponentFactory();

  const dummyEl = document.createElement('div');
  element.append(dummyEl);
  const resolvedVDom = iterateOverCustomComponents(vdom, (vCmpWrapper) => {
    console.log('****creating', vCmpWrapper);

    const customCmp = vCmpWrapper[CustomComponentKey];
    if (customCmp.props.$state) {
      customCmp.stateListeners = customCmp.props.$state.map(
        (path) => storeAdapter.listenOnStorePath(path, () => {
          setTimeout(update, 0);
        })
      );
    }
    customCmp.state = resolveComponentState(customCmp.props.$state);
    const componentVNode = customCmp.factory(customCmp.props, customCmp.state);

    vCmpWrapper.children = [componentVNode];

    return componentVNode;
  });
  patch(dummyEl, vdom);
  return lastVDom = vdom;

  function update() {
    console.log('------------ updating all...');
    const vdom = iterateOverCustomComponents(jsxComponentFactory(), attachPrepatchHook);
    return lastVDom = patch(lastVDom, vdom);
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
  function attachPrepatchHook(vNode) {
    vNode.data.hook = Object.assign(vNode.data.hook || {}, {
      prepatch(vOrigCmpWrapper, vCmpWrapper) {
        console.log('Time to prepatch: ', clone(vOrigCmpWrapper), clone(vCmpWrapper));

        const origCustomCmp = vOrigCmpWrapper[CustomComponentKey];
        const customCmp = vCmpWrapper[CustomComponentKey];

        customCmp.stateListeners = (origCustomCmp.stateLiseners || EmptyArray);

        customCmp.state = resolveComponentState(customCmp.props.$state);

        const cmpStateUnchanged = shallowEqual(customCmp.props, origCustomCmp.props) &&
          shallowEqual(customCmp.state, origCustomCmp.state);

        if (cmpStateUnchanged) {
          return vCmpWrapper.children = vOrigCmpWrapper.children;
        }

        const customCmpVNode = customCmp.factory(customCmp.props, customCmp.state);
        const resolveCustomCmpVNode = iterateOverCustomComponents(customCmpVNode, attachPrepatchHook)
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
