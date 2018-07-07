// @flow
import './App.css';

import React from 'react';
import { Route, Link } from 'react-router-dom';

import { CharacterDashboardPage } from '../../character_dashboard';
import { Socket } from '../../connection';

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <Socket.SocketContext.Consumer>
        {socket => (
          <div className="alcarin-app">
            <Link to="/">Go to main page</Link>
            <br />
            <Link to="/character-feed">Go to demo feed page</Link>
            <Route
              path="/character-feed"
              render={() => <CharacterDashboardPage socket={socket} />}
            />
          </div>
        )}
      </Socket.SocketContext.Consumer>
    );
  }
}
