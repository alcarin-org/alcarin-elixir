import {ContainerComponent} from './container-component';
//test only
import store from '../store';

import {range} from 'ramda';

const increase = () => store.dispatch({type: 'increase'});
const decrease = () => store.dispatch({type: 'decrease'});

export function MainComponent({counter, btnLabel}) {
  return (
    <div className="main-component-wrap">
      <ContainerComponent label="Basic" />
      <img src="http://brunch.io/images/logo.png" onclick={decrease}/>
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={increase}>
        {btnLabel}
      </button>
      { range(0, counter).map(() => (
        <ContainerComponent label="It's a 2th placeholder" $state={['counter']} />
      ) ) }
    </div>
  )
}
