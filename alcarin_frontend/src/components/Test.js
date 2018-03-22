import React from 'react';
import PropTypes from 'prop-types';

import logo from '../resources/logo.svg';

export default function Test({ counter, increase }) {
  return (
    <div className="Test">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React: {counter}</h1>
        <button onClick={increase}>Increase</button>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

Test.propTypes = {
  counter: PropTypes.number.isRequired,
  increase: PropTypes.func.isRequired,
};
