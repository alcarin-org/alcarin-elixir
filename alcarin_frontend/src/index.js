import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import createReduxStore from './store/Store';

const $root = document.getElementById('root');
const store = createReduxStore();

renderApp(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    renderApp(NextApp);
  });
}

registerServiceWorker();

function renderApp(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    $root
  );
}
