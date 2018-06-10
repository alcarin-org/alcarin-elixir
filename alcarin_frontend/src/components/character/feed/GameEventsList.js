import React from 'react';
import PropTypes from 'prop-types';
import { FeedMessageType } from '../../../store/types/character';

export default function GameEventsList({ feedMessages }) {
  return (
    <ul className="character-feed-presenter">
      {feedMessages.map((msg, ind) => <li key={ind}>{msg.content}</li>)}
    </ul>
  );
}

GameEventsList.propTypes = {
  feedMessages: PropTypes.arrayOf(FeedMessageType()).isRequired,
};
