/** @jsx html */

import {h} from 'snabbdom';
import store from './store';
import {html} from 'snabbdom-jsx';
import {connect} from './framework';

function CustomElement({counter}) {
  return (
    <input type="number" value={counter} />
  );
}

export function Component({counter, btnLabel, increase}) {
  return (
    <div>
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" on-click={increase}>
        {btnLabel}
      </button>
      <CustomElement counter={counter}></CustomElement>
    </div>
  )
}

export default connect(
  Component,
  (state) => ({counter: state.counter}),
  (dispatch) => ({increase: () => dispatch({type: 'increase'})})
);
