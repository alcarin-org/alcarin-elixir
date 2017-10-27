//test only
import store from '../store';

const increase = (index) => store.dispatch({type: 'increase', index});
const decrease = (index) => store.dispatch({type: 'decrease', index});

export function ContainerComponent({label, $children, index, counter}) {
  return (
    <fieldset onclick={() => increase(index)}>
      <legend>wot {counter || 0}</legend>

    </fieldset>
  );
}
