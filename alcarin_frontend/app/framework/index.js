import {mapObjIndexed, map, call} from 'ramda';
import BaobabAdapterFactory from './store-adapter/baobab-adapter';
import {shallowEqual, patch, iterateOverCustomComponents} from './utils';
import {
  CustomComponentKey,
} from './const';

export function bootstrap(queryEl, jsxComponentFactory, tree$) {
  var lastVDom = null;
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  const treeAdapter = BaobabAdapterFactory(tree$, updateUI);
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
    const customCmp = vCmpWrapper[CustomComponentKey];
    if (customCmp.props.$state) {
      const releaseListeners = mapObjIndexed(
        (path, key) => treeAdapter.onPathUpdate(path, whenComponentStateNeedUpdate(customCmp, key)),
        customCmp.props.$state
      );
      customCmp.release = () => map(call, releaseListeners);
    }
    customCmp.state = resolveComponentState(customCmp.props.$state);
    const componentVNode = customCmp.factory(customCmp.props, customCmp.state);

    vCmpWrapper.children = [componentVNode];

    return componentVNode;
  }

  function whenComponentStateNeedUpdate(customCmp, key) {
    return function onComponentStatePathUpdate(ev) {
      customCmp.state[key] = ev.data.currentData;
      customCmp.__needUpdate = true;
    }
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
        vCmpWrapper[CustomComponentKey].release();
      },
      prepatch(vOrigCmpWrapper, vCmpWrapper) {
        const origCustomCmp = vOrigCmpWrapper[CustomComponentKey];
        const customCmp = vCmpWrapper[CustomComponentKey];

        customCmp.release = origCustomCmp.release;
        customCmp.state = origCustomCmp.state;

        const cmpStateUnchanged = !customCmp.__needUpdate &&
          shallowEqual(customCmp.props, origCustomCmp.props);

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

  function resolveComponentState($stateDef) {
    const state = {};
    if ($stateDef) {
      for (let key in $stateDef) {
        let path = $stateDef[key];
        state[key] = tree$.select(path.split('.')).get();
      }
    }
    return state;
  }
}
