import React from 'react';
import PropTypes from 'prop-types';

export default function FeedMessageInput({ value, onChange }) {
  return (
    <div className="feed-message-input">
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
}

FeedMessageInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
