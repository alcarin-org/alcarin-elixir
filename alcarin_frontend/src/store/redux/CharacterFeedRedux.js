import { createReducer, createActions } from 'reduxsauce';
import { assoc } from 'ramda';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  increase: ['value'],
});

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(
  { counter: 0 },
  {
    [Types.INCREASE]: (store, { value }) =>
      assoc('counter', store.counter + value, store),
  }
);
