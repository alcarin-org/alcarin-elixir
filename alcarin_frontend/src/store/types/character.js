import PropTypes from 'prop-types';
import { always } from 'ramda';

export const FeedMessageType = always(
  PropTypes.shape({
    args: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }),
  })
);
