// @flow

import type { ActionType } from './Actions';

// eslint-disable-next-line flowtype/require-exact-type
export type ReducerDefType<TState> = {
  [actionName: string]: (TState, ActionType) => TState,
};

export function createReducer<TState>(
  initialState: TState,
  reducerDefinition: ReducerDefType<TState>
) {
  if (reducerDefinition.hasOwnProperty(undefined)) {
    throw new Error(
      'Unexpected reducer action type. Action "undefined" is not allowed.'
    );
  }
  return function reducer(state: TState, action: ActionType) {
    const currState = state || initialState;
    const { type } = action;
    return type in reducerDefinition
      ? reducerDefinition[type](currState, action)
      : currState;
  };
}
