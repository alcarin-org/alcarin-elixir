import { createStore, combineReducers, applyMiddleware } from 'redux';

import CharacterDashboard from './character_dashboard';
import asyncCallerMiddleware from './store/actions-async-handlers/index';

export default function createReduxStore() {
  return createStore(
    combineReducers({
      characterFeed: CharacterDashboard.reducer,
    }),
    applyMiddleware(asyncCallerMiddleware)
  );
}
