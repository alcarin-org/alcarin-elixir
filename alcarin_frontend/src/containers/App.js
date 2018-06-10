import React, { Component } from 'react';

import './App.css';

import { TestContainer } from './TestContainer';
// import CharacterFeed from './character/CharacterFeed';

export default class App extends Component {
  render() {
    return (
      <div className="alcarin">
        <TestContainer />
      </div>
    );
  }
}
