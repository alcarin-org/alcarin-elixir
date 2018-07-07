import { createStore, combineReducers, applyMiddleware } from 'redux';

import CharacterDashboard from './character_dashboard';
import ReduxHelper from './redux_helper';

// const devtoolsMiddleware =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
export default function createReduxStore() {
  return createStore(
    combineReducers({
      characterFeed: CharacterDashboard.reducer,
    }),
    applyMiddleware(ReduxHelper.asyncCallerMiddleware)
  );
}
