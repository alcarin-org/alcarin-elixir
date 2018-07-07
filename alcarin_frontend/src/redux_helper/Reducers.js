export function createReducer(initialState, reducerDefinition) {
  if (reducerDefinition.hasOwnProperty(undefined)) {
    throw new Error(
      'Unexpected reducer action type. Action "undefined" is not allowed.'
    );
  }
  return function reducer(state, action) {
    const currState = state || initialState;
    const { type } = action;
    return type in reducerDefinition
      ? reducerDefinition[type](currState, action)
      : currState;
  };
}
