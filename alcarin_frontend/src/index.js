import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvier } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import createReduxStore from './store/Store';
import { SocketContext, createSocketConnection } from './services/Socket';

const $root = document.getElementById('root');
const store = createReduxStore();
const socket = createSocketConnection();

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
    <StoreProvier store={store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </SocketContext.Provider>
    </StoreProvier>,
    $root
  );
}
