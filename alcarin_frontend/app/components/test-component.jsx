import {connect} from '../framework';
import {ContainerComponent} from './container-component';
var x = false;
export function TestComponent({counter, btnLabel, increase}) {
  return (
    <div className="recognize-me">
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={increase}>
        {btnLabel}
      </button>
      <ContainerComponent label="It's in placeholder" counter={counter} $class={{myClass: x = !x}}>
      </ContainerComponent>
      <ContainerComponent label="It's a 2th placeholder">
      </ContainerComponent>
    </div>
  )
}

export default connect(
  TestComponent,
  (state) => ({counter: state.counter}),
  (dispatch) => ({increase: () => dispatch({type: 'increase'})})
);
