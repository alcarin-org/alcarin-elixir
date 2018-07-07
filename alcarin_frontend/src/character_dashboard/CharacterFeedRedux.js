// @flow

import { lensProp, over, append, assoc } from 'ramda';

import {
  createActions,
  createReducer,
  createAPICallActions,
} from '../redux_helper';
import { Api } from '../connection';

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions('charFeed', {
  ...createAPICallActions('fetchFeed', Api.fetchCharacterFeed),
  putGameEvent: { gameEvent: null },
});

/* ------------- Hookup Reducers To Types ------------- */
const gameEventsLens = lensProp('gameEvents');

export const reducer = createReducer(
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
