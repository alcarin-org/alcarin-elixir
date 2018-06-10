import './styles/CharacterFeed.css';

import React from 'react';
import PropTypes from 'prop-types';

import GameEventsList from './GameEventsList';
import FeedMessageInput from './FeedMessageInput';

const Messages = [
  { content: 'First message' },
  { content: 'Second message' },
  { content: 'Third messag2e' },
];

export default class CharacterFeed extends React.PureComponent {
  state = {
    chatInput: '',
    gameEvents: [...Messages],
  };

  onInputChange = ev => this.setState({ chatInput: ev.target.value });
  onSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      chatInput: '',
      gameEvents: this.state.gameEvents.concat({
        content: this.state.chatInput,
      }),
    });
  };

  render() {
    return (
      <div className="character-feed">
        <GameEventsList feedMessages={this.state.gameEvents} />
        <form onSubmit={this.onSubmit}>
          <label>{this.props.label}</label>
          <FeedMessageInput
            value={this.state.chatInput}
            onChange={this.onInputChange}
          />
        </form>
      </div>
    );
  }
}

CharacterFeed.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
