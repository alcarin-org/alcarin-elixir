import { createReducer, createActions } from 'reduxsauce';
import { assoc, lensProp, over, append } from 'ramda';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  fetchFeed: null,
  fetchFeedSuccess: ['payload'],
  fetchFeedFail: ['response'],

  putGameEvent: ['gameEvent'],
  increase: ['value'],
});

/* ------------- Hookup Reducers To Types ------------- */

const gameEventsLens = lensProp('gameEvents');

export default createReducer(
  { gameEvents: [] },
  {
    [Types.FETCH_FEED_SUCCESS]: (store, { payload }) =>
      assoc('gameEvents', payload.game_events, store),
    [Types.PUT_GAME_EVENT]: (store, { gameEvent }) =>
      over(gameEventsLens, append(gameEvent), store),
    [Types.INCREASE]: (store, { value }) =>
      assoc('counter', store.counter + value, store),
  }
);
