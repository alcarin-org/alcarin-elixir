// @flow

import React from 'react';

import './App.css';

import CharacterFeed from './character/CharacterFeedContainer';

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <div className="alcarin">
        <CharacterFeed onSubmit={() => undefined} />
      </div>
    );
  }
}
