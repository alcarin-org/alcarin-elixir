import {connect} from '../framework';
import {ContainerComponent} from './container-component';

export function TestComponent({counter, btnLabel, increase}) {
  return (
    <div className="recognize-me">
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={increase}>
        {btnLabel}
      </button>
      <ContainerComponent label="It's in placeholder">
        <input type="text" value={3} />
        <label>wot 666</label>
      </ContainerComponent>
    </div>
  )
}

export default connect(
  TestComponent,
  (state) => ({counter: state.counter}),
  (dispatch) => ({increase: () => dispatch({type: 'increase'})})
);
