import {MainComponent} from './components/main-component'
import store from './store';
import {bootstrap} from './framework';


bootstrap(
  '#app',
  () => <MainComponent btnLabel='just test' checked={true} $state={['counter']}/>,
  store
);

// setInterval(() => store.dispatch({type: 'increase'}), 3000);
