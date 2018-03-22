import Baobab from 'baobab';
import { createContext } from 'react';

const Store = new Baobab({
  counter: 1,
});

export const StoreContext = createContext({
  store: null,
});

var i = 0;
setInterval(function() {
  Store.select('text').set('test' + i++);
}, 2000);
export default Store;
