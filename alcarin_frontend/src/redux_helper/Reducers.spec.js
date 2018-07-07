// @flow

import { createReducer } from './Reducers';

test('createAPICallActions() should prepare definition for two actions, req and res', () => {
  const state = {
    value: 0,
  };
  const reducerDef = {
    ACTION_TYPE_1: jest.fn((state, { val }) => ({ ...state, value: 1 })),
    ACTION_TYPE_2: jest.fn((state, { val }) => ({ ...state, value: 2 })),
    ACTION_TYPE_3: jest.fn((state, { val }) => ({ ...state, value: 3 })),
  };
  const reducer = createReducer({}, reducerDef);

  const action2 = { type: 'ACTION_TYPE_2', payload: {} };
  expect(reducer(state, action2)).toEqual({ value: 2 });
  expect(reducerDef.ACTION_TYPE_2).toHaveBeenCalledWith(state, action2);

  const action3 = { type: 'ACTION_TYPE_3', payload: {} };
  expect(reducer(state, action3)).toEqual({ value: 3 });
  expect(reducerDef.ACTION_TYPE_3).toHaveBeenCalledWith(state, action3);

  const action1 = { type: 'ACTION_TYPE_1', payload: {} };
  expect(reducer(state, action1)).toEqual({ value: 1 });
  expect(reducerDef.ACTION_TYPE_1).toHaveBeenCalledWith(state, action1);
});

test('createAPICallActions() should respect initial state value', () => {
  const reducerDef = {
    ACTION_TYPE_1: jest.fn((state, { val }) => ({ ...state, value: 1 })),
  };
  const DefaultState = { initialValue: 'test' };
  const reducer = createReducer(DefaultState, reducerDef);

  const action1 = { type: 'ACTION_TYPE_1', payload: {} };
  expect(reducer(null, action1)).toMatchObject({
    value: 1,
    initialValue: 'test',
  });
  expect(reducerDef.ACTION_TYPE_1).toHaveBeenCalledWith(DefaultState, action1);
});
