import {MainComponent} from './components/main-component'
import store from './store';
import {bootstrap} from './framework';


bootstrap(
  '#app',
  () => <MainComponent btnLabel='just test' checked={true} $state={{counter: 'counter.0'}}/>,
  store
);
