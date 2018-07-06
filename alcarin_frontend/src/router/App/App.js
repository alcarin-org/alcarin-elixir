// @flow
import './App.css';

import React from 'react';
import { Route, Link } from 'react-router-dom';

import CharacterDashboard from '../../character_dashboard';
import Connection from '../../connection';

const { SocketContext } = Connection.Socket;

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <SocketContext.Consumer>
        {socket => (
          <div className="alcarin-app">
            <Link to="/">Go to main page</Link>
            <br />
            <Link to="/character-feed">Go to demo feed page</Link>
            <Route
              path="/character-feed"
              render={() => (
                <CharacterDashboard.CharacterDashboardPage socket={socket} />
              )}
            />
          </div>
        )}
      </SocketContext.Consumer>
    );
  }
}
