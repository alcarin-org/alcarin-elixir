var $store = null;
var $lastState = null;
var listeners = {};

export function initStore(store) {
  $store = store;
  $lastState = store.getState();
  $store.subscribe(onStoreChange);
}

export function listenOnStorePath(path, callback) {
  if (! (path in listeners)) {
    listeners[path] = [];
  }

  listeners[path].push(callback);
}

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
