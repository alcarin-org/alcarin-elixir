import store from './store';
import {connect} from './framework';

function CustomElement({counter, children}) {
  return (
    <div>
      {children}
      <input type="number" value={counter} />
    </div>
  );
}

export function Component({counter, btnLabel, increase}) {
  return (
    <div>
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={increase}>
        {btnLabel}
      </button>
      <CustomElement counter={counter}>
        <input type="text" value={3} />
        <label>wot 666</label>
      </CustomElement>
    </div>
  )
}

export default connect(
  Component,
  (state) => ({counter: state.counter}),
  (dispatch) => ({increase: () => dispatch({type: 'increase'})})
);
