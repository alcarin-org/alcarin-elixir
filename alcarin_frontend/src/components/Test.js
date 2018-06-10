import React from 'react';
import PropTypes from 'prop-types';

import logo from '../resources/logo.svg';

export default function Test({ inProgress, characterFeedConnected, join }) {
  return (
    <div className="Test">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React ({inProgress ? 'in progress' : 'not in progress'})</h1>
        {characterFeedConnected ? (
          <span>Connected!</span>
        ) : (
          <button onClick={join}>Join</button>
        )}
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

Test.propTypes = {
  characterFeedConnected: PropTypes.bool.isRequired,
  join: PropTypes.func.isRequired,
};
