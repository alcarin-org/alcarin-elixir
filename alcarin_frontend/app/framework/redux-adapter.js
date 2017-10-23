import {path} from 'ramda';

var $store = null;
var $lastState = null;
var listeners = {};

export function initStore(store) {
  $store = store;
  $lastState = store.getState();
  $store.subscribe(onStoreChange);
}

export function listenOnStorePath(path, callback) {
  console.log('start listening on: ', path)
  if (! (path in listeners)) {
    listeners[path] = [];
  }

  listeners[path].push(callback);

  return function reduxListenerOff() {
    console.log('trying to release state listener')
    const ind = listeners[path].indexOf(callback);
    if (ind) {
      console.log('state listener sreleased')
      listeners[path].splice(ind, 1);
    }
  };
}

export const getState = (_path) => path(_path.split('.'), $store.getState());

function onStoreChange() {
  const $state = $store.getState();
  if ($state === $lastState) {
    return;
  }

  for (let path in listeners) {
    let [hasChanged, value] = pathChanged(path, $state, $lastState);
    if (hasChanged) {
      listeners[path].forEach((callback) => callback(value));
    }
  }
}

function pathChanged(path, $state, $lastState) {
  const parts = path.split('.');

  var subState = $state;
  var subLastState = $lastState;
  var val;
  var part;
  while (part = parts.shift()) {
    if (part === undefined) {
      return;
    }
    if (subState[part] === subLastState[part]) {
      return [false, null];
    }

    val = part;
  }

  return [true, val];
}
