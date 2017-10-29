import {set, mapObjIndexed, call, map} from 'ramda';

import {
  shallowEqual,
  JsxComponentDataKey,
  MAX_SAFE_INTEGER,
} from './utils';

export default function StateManager(tree$, updateCallback) {
  const componentsMap = {};
  var currIndex = -MAX_SAFE_INTEGER;

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

  const stateManager = {
    registerComponent(vdom) {
      // cmpId should never be too big, as even if 1000x components would be
      // generated every second it would take many years to exceed the counter
      const cmpId = currIndex++;
      const jsxComponentData = vdom[JsxComponentDataKey];
      const $stateDef = jsxComponentData.props.$state || {};
      const state = mapObjIndexed(
        (path, key) => tree$.select(path.split('.')).get(),
        $stateDef
      );

      const componentSummaryState = componentsMap[cmpId] = {
        props: jsxComponentData.props,
        state,
      };

      componentSummaryState['listenersRemovers'] = mapObjIndexed(
        (path, key) => onPathUpdate(path, (ev) => {
          componentSummaryState.state[key] = ev.data.currentData;
          componentSummaryState.needUpdate = true;
        }),
        $stateDef
      );

      return [cmpId, stateManager.componentTotalState(cmpId)];
    },
    releaseComponent(cmpId) {
      map(call, componentsMap[cmpId].listenersRemovers);
      return delete componentsMap[cmpId];
    },
    componentTotalStateChanged(cmpId, jsxComponentData) {
      const componentSummaryState = componentsMap[cmpId];
      const needUpdate = componentSummaryState.needUpdate;
      componentSummaryState.needUpdate = false;
      return needUpdate || !shallowEqual(componentSummaryState.props, jsxComponentData.props);
    },
    componentTotalState(cmpId) {
      const componentSummaryState = componentsMap[cmpId];
      return Object.assign({}, componentSummaryState.props, componentSummaryState.state);
    },
  };

  return stateManager;

  function onPathUpdate(path, callback) {
    const cursor = tree$.select(path.split('.'));
    cursor.on('update', callback);
    return function release() {
      cursor.off('update', callback);
    };
  }
}
