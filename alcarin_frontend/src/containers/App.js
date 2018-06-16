// @flow

import React from 'react';

import './App.css';

// import { TestContainer } from './TestContainer';
import CharacterFeed from './character/CharacterFeedContainer';

type TestPropsType = { test: string };

class Test extends React.PureComponent<TestPropsType> {
  render() {
    return this.props.test;
  }
}

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <div className="alcarin">
        <Test test="5" />
        <CharacterFeed onSubmit={() => undefined} />
      </div>
    );
  }
}
