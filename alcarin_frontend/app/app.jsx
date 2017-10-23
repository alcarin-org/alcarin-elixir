import {TestComponent} from './components/test-component'
import store from './store';
import {bootstrap} from './framework';

bootstrap(
  '#app',
  () => <TestComponent btnLabel='just test' checked={true} $state={['counter']}/>,
  store
);

setInterval(() => store.dispatch({type: 'increase'}), 3000);
