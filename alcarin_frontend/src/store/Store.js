import { createStore, combineReducers, applyMiddleware } from 'redux';

import TestReducer from './redux/TestRedux';
import CharacterFeedReducer from './redux/CharacterFeedRedux';
import asyncCallerMiddleware from './actions-async-handlers/index';

export default function createReduxStore() {
  return createStore(
    combineReducers({
      characterFeed: CharacterFeedReducer,
      test: TestReducer,
    }),
    applyMiddleware(asyncCallerMiddleware)
  );
}
