import React from 'react';
import PropTypes from 'prop-types';

import logo from '../resources/logo.svg';

export default function Test({ characterFeedConnected, join }) {
  console.info('rerender test', characterFeedConnected);
  return (
    <div className="Test">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
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
  // counter: PropTypes.number.isRequired,
  // increase: PropTypes.func.isRequired,
};
