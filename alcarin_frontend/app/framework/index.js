import {clone} from 'ramda';
import ReduxAdapterFactory from './redux-adapter';
import {shallowEqual, patch, iterateOverCustomComponents} from './utils';

const EmptyObject = {};

export function bootstrap(queryEl, jsxComponentFactory, store) {
  var lastVDom = null;
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  var storeAdapter = ReduxAdapterFactory(store);
  var vdom = jsxComponentFactory();

  const dummyEl = document.createElement('div');
  element.append(dummyEl);
  const resolvedVDom = iterateOverCustomComponents(vdom, (vCmpWrapper) => {
    console.log('****creating', vCmpWrapper);

    if (vCmpWrapper.data.props.$state) {
      console.log(`$state found`)
      vCmpWrapper.stateListeners = vCmpWrapper.data.props.$state.map(
        (path) => storeAdapter.listenOnStorePath(path, () => {
          console.warn('path', path, 'changed');
          setTimeout(update, 0);
        })
      );
    }
    vCmpWrapper.stateValue = resolveComponentState(vCmpWrapper.data.props);
    const componentVNode = vCmpWrapper.factory(vCmpWrapper.stateValue);

    delete vCmpWrapper.factory;
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
      prepatch(vCmpPrevWrapper, vCmpWrapper) {
        console.log('Time to prepatch: ', clone(vCmpPrevWrapper), clone(vCmpWrapper));

        if (vCmpPrevWrapper.stateListeners) {
          vCmpWrapper.stateListeners = vCmpPrevWrapper.stateLiseners;
          delete vCmpPrevWrapper.stateListeners;
        }

        const state = resolveComponentState(vCmpWrapper.data.props);

        const stateNotChanged = shallowEqual(vCmpPrevWrapper.data.props, vCmpWrapper.data.props) &&
          shallowEqual(vCmpPrevWrapper.$lastState, state);
        vCmpWrapper.children = stateNotChanged ? vCmpPrevWrapper.children : [
          iterateOverCustomComponents(vCmpWrapper.factory(state), attachPrepatchHook)
        ];

        vCmpWrapper.$lastState = state;
      }
    });

    return vNode;
  }

  function resolveComponentState(props) {
    const state = {};
    if (props.$state) {
      for (let i = 0; i < props.$state.length; i++) {
        let path = props.$state[i];
        state[path] = storeAdapter.getState(path);
      }
      delete props.$state;
    }
    return state;
  }
}
