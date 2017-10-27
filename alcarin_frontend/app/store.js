import Baobab from 'baobab';
import {inc, dec, is, ifElse, always} from 'ramda'

window.Baobab = Baobab;
const $tree = new Baobab({
  counter: [3],
});

const increment = ifElse(is(Number), inc, always(1));
const decrement = ifElse(is(Number), dec, always(1));

const counter$ = $tree.select('counter');
$tree.dispatch = function (action) {
  switch (action.type) {
    case 'increase':
      return counter$.apply(action.index || 0, increment);
    case 'decrease':
      return counter$.apply(action.index || 0, decrement);
    default:
      console.warn(`Unknown action: ${action.type}`);
      return state;
  }
}

$tree.on('update', (e) => console.log(e.data.currentData));

export default $tree;

