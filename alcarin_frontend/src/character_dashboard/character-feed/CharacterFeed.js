// @flow

import './CharacterFeed.css';

import React from 'react';

type GameEventType = {|
  type: string,
  args: {
    content: string,
  },
|};

type CharacterPropertyStateType = {|
  chatInput: string,
|};
type OnInputChangeType = (SyntheticInputEvent<HTMLInputElement>) => any;

type ComponentPropsType = {|
  label?: string,
  gameEvents: GameEventType[],
  onSubmit?: (state: CharacterPropertyStateType) => any,
|};

// const Messages: GameEventType[] = [
//   { content: 'First message' },
//   { content: 'Second message' },
//   { content: 'Third message' },
// ];

export default class CharacterFeed extends React.PureComponent<
  ComponentPropsType,
  CharacterPropertyStateType
> {
  state = {
    chatInput: '',
  };

  onInputChange: OnInputChangeType = ev =>
    this.setState({ chatInput: ev.target.value });

  onSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state);
    this.setState({
      chatInput: '',
    });
  };

  render() {
    return (
      <div className="character-feed">
        <ul className="character-feed-presenter">
          {this.props.gameEvents
            .filter(msg => msg.type === 'speak')
            .map((msg, ind) => (
              <li key={ind}>{msg.args && msg.args.content}</li>
            ))}
        </ul>
        <form onSubmit={this.onSubmit}>
          <label>{this.props.label}</label>
          <div className="feed-message-input">
            <input
              type="text"
              value={this.state.chatInput}
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}
