import {path} from 'ramda';

export default function ReduxAdapter($store) {
  const listeners = {};

  var $lastState = $store.getState();
  $store.subscribe(onStoreChange);

  return {
    listenOnStorePath(path, callback) {
      console.log('start listening on: ', path)

      listeners[path] = callback;
      return function reduxListenerOff() {
        console.log('trying to release state listener')
        delete listeners[path];
      };
    },

    getState(_path) {
      return path(_path.split('.'), $lastState);
    }

  };

  function onStoreChange() {
    const $state = $store.getState();
    if ($state === $lastState) {
      return;
    }
    for (let path in listeners) {
      let [hasChanged, value] = pathChanged(path, $state, $lastState);
      if (hasChanged) {
        listeners[path](value)
      }
    }

    $lastState = $state;
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
