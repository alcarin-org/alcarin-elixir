import {MainComponent} from './components/main-component'
import store from './store';
import {bootstrap} from './framework';

window.DEBUG = (process.env.NODE_ENV === 'development');

bootstrap(
  '#app',
  () => <MainComponent btnLabel='just test' checked={true} $state={{counter: 'counter.0'}}/>,
  store
);
