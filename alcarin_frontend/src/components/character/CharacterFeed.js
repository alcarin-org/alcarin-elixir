import './styles/CharacterFeed.css';

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

// import { FeedMessageType } from '../../store/types/character';

import CharacterFeedPresenter from '../../components/character/CharacterFeedPresenter';
import FeedMessageInput from '../../components/character/FeedMessageInput';

const messages = [
  { content: 'First message' },
  { content: 'Second message' },
  { content: 'Third messag2e' },
];

export default class CharacterFeed extends React.PureComponent {
  state = {
    msgContent: '',
  };

  triggerChange = debounce(text => this.props.onChange(text), 200);

  onChange = ev => {
    this.setState({ msgContent: ev.target.value });
    this.triggerChange(ev.target.value);
  };

  render() {
    return (
      <div className="character-feed">
        <CharacterFeedPresenter feedMessages={messages} />
        <label>{this.props.label}</label>
        <FeedMessageInput
          value={this.state.msgContent}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

CharacterFeed.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
