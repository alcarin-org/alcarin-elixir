import { connect } from 'react-redux';

import CharacterFeed from '../components/CharacterFeed';
// import { Creators as FeedActions } from '../store/redux/CharacterFeedRedux';

export const CounterContainer = connect(
  state => {},
  {}
)(CharacterFeed);
