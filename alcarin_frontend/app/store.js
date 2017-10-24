import Baobab from 'baobab';
import {inc, dec} from 'ramda'

const $tree = new Baobab({
  counter: 0,
});

const counter$ = $tree.select('counter');
$tree.dispatch = function (action) {
  switch (action.type) {
    case 'increase':
      return counter$.apply(inc);
    case 'decrease':
      return counter$.apply(dec);
    default:
      console.warn(`Unknown action: ${action.type}`);
      return state;
  }
}

export default $tree;

