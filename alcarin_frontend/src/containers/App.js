import React, { Component } from 'react';

import './App.css';

// import { Test } from './BranchedComponents';
import CharacterFeed from './character/CharacterFeed';

export default class App extends Component {
  render() {
    return (
      <div className="alcarin">
        <CharacterFeed />
      </div>
    );
  }
}
