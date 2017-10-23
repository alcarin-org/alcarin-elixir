import { createStore } from 'redux'
import {lensPath, over, inc} from 'ramda'

export default createStore(
  reducer,
  {counter: 1},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const countLens = lensPath(['counter']);

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return over(countLens, inc, state);
    case '@@INIT':
      return state;
    default:
      console.warn(`Unknown redux action: ${action.type}`);
      return state;
  }
}
