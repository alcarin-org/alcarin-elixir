import React, { Component } from 'react';

import './App.css';

import { Test } from './BranchedComponents';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Test />
      </div>
    );
  }
}
