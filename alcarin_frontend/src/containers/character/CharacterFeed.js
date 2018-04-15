import './styles/CharacterFeed.css';

import React from 'react';
// import PropTypes from 'prop-types';
// import { FeedMessageType } from '../../store/types/character';

import CharacterFeedPresenter from '../../components/character/CharacterFeedPresenter';
import FeedMessageInput from '../../components/character/FeedMessageInput';

const messages = [
  { content: 'First message' },
  { content: 'Second message' },
  { content: 'Third message' },
];

export default class CharacterFeed extends React.PureComponent {
  state = {
    msgContent: '',
  };

  onChange = ev => this.setState({ msgContent: ev.target.value });

  render() {
    return (
      <div className="character-feed">
        <CharacterFeedPresenter feedMessages={messages} />
        <FeedMessageInput
          value={this.state.msgContent}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
