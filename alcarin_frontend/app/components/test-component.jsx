import {ContainerComponent} from './container-component';
var x = false;

export function TestComponent({counter, btnLabel, increase}) {
  return (
    <div className="main-component-wrap">
      <img src="http://brunch.io/images/logo.png" />
      <label>Click Count: {counter}</label>
      <button id="clickme" className="btn" onclick={increase}>
        {btnLabel}
      </button>
      <ContainerComponent label="It's in placeholder" $class={{myClass: x = !x}}>
      </ContainerComponent>
      <ContainerComponent label="It's a 2th placeholder" $state={['counter']}>
      </ContainerComponent>
    </div>
  )
}
