// @flow

import { lensProp, over, append, assoc } from 'ramda';

import ReduxHelper from '../redux_helper';
import Connection from '../connection';
const { createActions, createReducer, createAPICallActions } = ReduxHelper;

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions('charFeed', {
  ...createAPICallActions('fetchFeed', Connection.Api.fetchCharacterFeed),
  putGameEvent: { gameEvent: null },
});

/* ------------- Hookup Reducers To Types ------------- */
const gameEventsLens = lensProp('gameEvents');

export default createReducer(
  { gameEvents: [] },
  {
    [Types.FETCH_FEED_REQUEST]: (store, action) => {
      console.info('request....', action);
      return store;
      // assoc('gameEvents', payload.game_events, store),
    },
    [Types.FETCH_FEED_RESPONSE]: (store, { payload }) =>
      assoc('gameEvents', payload.game_events, store),
    [Types.PUT_GAME_EVENT]: (store, { payload: { gameEvent } }) =>
      over(gameEventsLens, append(gameEvent), store),
  }
);
