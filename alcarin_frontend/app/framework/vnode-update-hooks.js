import { JsxComponentDataKey } from './utils';

export function attachUpdateHooks(vNode, stateManager) {
  return iterateOverCustomComponents(vNode, attachVNodeHooks);

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
      init(vNode) {
        const [cmpId, totalState] = stateManager.registerComponent(vNode);
        vNode.$componentKey = cmpId;
        const componentVNode = vNode[JsxComponentDataKey].factory(totalState);
        vNode.children = [componentVNode];
        iterateOverCustomComponents(componentVNode, attachVNodeHooks);
      },
      destroy(vNode) {
        stateManager.releaseComponent(vNode.$componentKey);
      },
      prepatch(vOrigCmpWrapper, vCmpWrapper) {
        vCmpWrapper.$componentKey = vOrigCmpWrapper.$componentKey;

        const cmpStateChanged = stateManager.componentTotalStateChanged(
          vCmpWrapper.$componentKey,
          vCmpWrapper[JsxComponentDataKey]
        );
        if (!cmpStateChanged) {
          return (vCmpWrapper.children = vOrigCmpWrapper.children);
        }

        const state = stateManager.componentTotalState(
          vOrigCmpWrapper.$componentKey
        );
        const resolveCustomCmpVNode = iterateOverCustomComponents(
          vCmpWrapper[JsxComponentDataKey].factory(state),
          attachVNodeHooks
        );
        vCmpWrapper.children = [resolveCustomCmpVNode];
      },
    });
    return vNode;
  }
}

function iterateOverCustomComponents(vNode, componentResolveFn) {
  if (!vNode) {
    return;
  }

  const stack = [vNode];
  while (stack.length > 0) {
    let realVNode = stack.pop();
    if (realVNode === undefined) {
      continue;
    }
    if (realVNode[JsxComponentDataKey]) {
      realVNode = componentResolveFn(realVNode);
    }
    if (realVNode.children) {
      [].push.apply(stack, realVNode.children);
    }
  }

  return vNode;
}
