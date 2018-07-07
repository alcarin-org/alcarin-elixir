import { createStore, combineReducers, applyMiddleware } from 'redux';

import { reducer as characterDashboardReducer } from './character_dashboard';
import { asyncCallerMiddleware } from './redux_helper';

// const devtoolsMiddleware =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default function createReduxStore() {
  return createStore(
    combineReducers({
      characterFeed: characterDashboardReducer,
    }),
    applyMiddleware(asyncCallerMiddleware)
  );
}
