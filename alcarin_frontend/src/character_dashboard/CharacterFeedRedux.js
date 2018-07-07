// @flow

import { lensProp, over, append, assoc } from 'ramda';

import { Api } from '../connection';
import {
  createActions,
  createReducer,
  createAPICallActions,
} from '../redux_helper';

const gameEventsLens = lensProp('gameEvents');

type StateType = {|
  gameEvents: Array<Object>,
|};

export const { Types, Creators } = createActions('charFeed', {
  ...createAPICallActions('fetchFeed', Api.fetchCharacterFeed),
  putGameEvent: { gameEvent: null },
});

const InitialState: StateType = { gameEvents: [] };

const fetchFeedResponse = (store: StateType, { payload }) =>
  assoc('gameEvents', payload.game_events, store);

const putGameEvent = (store: StateType, { payload: { gameEvent } }) =>
  over(gameEventsLens, append(gameEvent), store);

export const reducer = createReducer(InitialState, {
  [Types.FETCH_FEED_RESPONSE]: fetchFeedResponse,
  [Types.PUT_GAME_EVENT]: putGameEvent,
});
