import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import Store, { StoreContext } from './store/Store';

const $root = document.getElementById('root');

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
    <StoreContext.Provider value={{ store: Store }}>
      <App />
    </StoreContext.Provider>,
    $root
  );
}
