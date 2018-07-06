import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvier } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'normalize.css';

import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import createReduxStore from './store';
import Connection from './connection';

const Socket = Connection.Socket;
const $root = document.getElementById('root');
const store = createReduxStore();
const socket = Socket.createSocketConnection();

renderApp(Router.App);

if (module.hot) {
  module.hot.accept('./router', () => {
    const { App: NextApp } = require('./router').default;
    renderApp(NextApp);
  });
}

registerServiceWorker();

function renderApp(App) {
  ReactDOM.render(
    <StoreProvier store={store}>
      <Socket.SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
      </Socket.SocketContext.Provider>
    </StoreProvier>,
    $root
  );
}
