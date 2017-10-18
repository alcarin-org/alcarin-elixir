
export function connect(Component, stateMap, actionsMap) {
  return function ResultComponent(store, props) {
    const componentState = (stateMap && stateMap(store.getState())) || {};
    const componentActions = (actionsMap && actionsMap(store.dispatch)) || {};
    return Component(Object.assign(
      componentState,
      componentActions,
      props
    ));
  }
}

// export default function ApplicationComponent(store) {

// }
