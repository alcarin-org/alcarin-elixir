import TestComponent from './components/test-component'
import store from './store';
import {bootstrap} from './framework';

bootstrap(store, '#app', TestComponent, {
  btnLabel: 'just test',
  checked: true,
});

store.dispatch({type: 'increase'});
