import {mapObjIndexed, map, call} from 'ramda';
import StateManagerFactory from './state-manager';
import {patch} from './utils';
import {attachUpdateHooks} from './vnode';

export function bootstrap(queryEl, jsxComponentFactory, tree$) {
  var lastVDom = null;
  const element = document.querySelector(queryEl);
  if (!element) {
    throw new Error(`Can't find "${queryEl}".`);
  }

  const stateManager = StateManagerFactory(tree$, updateUI);

  lastVDom = element;
  return updateUI();

  function updateUI() {
    const rootVDom = jsxComponentFactory();
    return lastVDom = patch(
      lastVDom,
      attachUpdateHooks(rootVDom, stateManager)
    );
  }
}
