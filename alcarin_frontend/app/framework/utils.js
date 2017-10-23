import {init} from 'snabbdom';

import classModule from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import dataset from 'snabbdom/modules/dataset';
import eventlisteners from 'snabbdom/modules/eventlisteners';
import attributes from 'snabbdom/modules/attributes';
import {
  CustomComponentKey,
} from './const';

export const patch = init([
  classModule,
  props,
  style,
  dataset,
  eventlisteners,
  attributes,
]);

export function shallowEqual(objA, objB) {
  if (!objA || !objB) {
    return objA === objB;
  }
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
}

export function iterateOverCustomComponents(vNode, componentResolveFn) {
  if (!vNode) {
    return;
  }

  const stack = [vNode];

  while(stack.length > 0) {
    let realVNode = stack.pop();
    if (realVNode === undefined) {
      continue;
    }
    if (realVNode[CustomComponentKey]) {
      realVNode = componentResolveFn(realVNode);
    }
    if (realVNode.children) {
      [].push.apply(stack, realVNode.children);
    }
  }

  return vNode;
}
