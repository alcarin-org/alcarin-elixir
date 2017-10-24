export default function BaobabAdapter($tree) {
  return {
    listenOnStorePath(path, callback) {
      console.log('start listening on: ', path);

      $tree.select(path.split('.'))
        .on('update', callback);

      return function reduxListenerOff() {
        // we dont release baobab cursors, as they have internal pool.
        // e.g. is true:
        // $tree.cursor('counter') === $tree.cursor('counter')
        console.log('trying to release state listener')
      };
    },

    getState(_path) {
      return $tree.select(_path.split('.')).get();
    }

  };
}
