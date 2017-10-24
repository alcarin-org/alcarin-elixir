import {ContainerComponent} from './container-component';
//test only
import store from '../store';

const decrease = () => store.dispatch({type: 'decrease'});

export function TestComponent({counter, btnLabel, increase}) {
  return (
    <div className="main-component-wrap">
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={decrease}>
        {btnLabel}
      </button>
      <ContainerComponent label="It's in placeholder">
      </ContainerComponent>
      <ContainerComponent label="It's a 2th placeholder" $state={['counter']}>
      </ContainerComponent>
    </div>
  )
}


