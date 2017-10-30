import StateManagerFactory from './state-manager';
import { patch } from './utils';
import { attachUpdateHooks } from './vnode-update-hooks';

export function bootstrap(queryEl, jsxComponentFactory, tree$) {
  var lastVDom = document.querySelector(queryEl);
  if (!lastVDom) {
    throw new Error(`Can't find DOM element "${queryEl}".`);
  }

  const stateManager = StateManagerFactory(tree$, updateUI);
  return updateUI();

  function updateUI() {
    const rootVDom = jsxComponentFactory();
    return (lastVDom = patch(
      lastVDom,
      attachUpdateHooks(rootVDom, stateManager)
    ));
  }
}
