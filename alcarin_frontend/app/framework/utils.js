import {init} from 'snabbdom';

import classModule from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import dataset from 'snabbdom/modules/dataset';
import eventlisteners from 'snabbdom/modules/eventlisteners';
import attributes from 'snabbdom/modules/attributes';

// TODO: make it shorter on prod build
export const CustomComponentContainerClass = '__custom-component-container';
export const JsxComponentDataKey = '__custom-component';
export const EmptyObject = Object.freeze({});
// value that should be available on Number.MAX_SAFE_INTEGER
export const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;


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
