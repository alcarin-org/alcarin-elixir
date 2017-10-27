export default function BaobabAdapter(tree$, updateCallback) {
  const listeners = {};

  var updateQueued = false;
  function meaningfulStateChanged() {
    if (updateQueued) {
      return;
    }

    updateQueued = true;
    setTimeout(() => {
      updateCallback();
      // console.log('current update listeners: ', listeners)
      updateQueued = false;
    }, 0);
  }

  tree$.on('update', meaningfulStateChanged);

  return {
    onPathUpdate(path, callback) {
      const cursor = tree$.select(path.split('.'));
      cursor.on('update', callback);
      return function release() {
        cursor.off('update', callback);
      };
    },
  };
}
