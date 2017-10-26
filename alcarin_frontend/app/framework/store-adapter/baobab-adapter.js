export default function BaobabAdapter($tree, updateCallback) {
  const listeners = {};

  var updateQueued = false;
  function meaningfulStateChanged() {
    if (updateQueued) {
      return;
    }

    updateQueued = true;
    setTimeout(() => {
      updateCallback();
      console.log('current update listeners: ', listeners.counter)
      updateQueued = false;
    }, 0);
  }

  return {
    updateOnStorePath(path) {
      if (listeners[path]) {
        listeners[path].power++;
        return release;
      }
      listeners[path] = {
        cursor: $tree.select(path.split('.')),
        power: 1,
      };
      listeners[path].cursor.on('update', meaningfulStateChanged);

      return release;

      function release() {
        // we don't calling "release" as cursors are "shared"
        // inside tree - and it would could destroy cursors used
        // in unknown places.
        // TODO: checking if simple cursor (string only like these)
        // will auto-cleanup memory after lost reference
        listeners[path].power--;
        if (listeners[path].power <= 0) {
          delete listeners[path];
        }
      };
    },

    getState(_path) {
      return $tree.select(_path.split('.')).get();
    }
  };
}
