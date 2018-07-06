/**
 * character_dashboard module provide core features for user character dashboard
 * page
 */

import CharacterDashboardPage from './CharacterDashboardPage';
import { connect } from 'react-redux';
import reducer, { Creators, Types } from './CharacterFeedRedux';

const ConnectedCharacterDashboardPage = connect(
  state => ({ gameEvents: state.characterFeed.gameEvents }),
  {
    fetchCharacterFeed: Creators.fetchFeed,
    putGameEvent: Creators.putGameEvent,
  }
)(CharacterDashboardPage);

export default {
  CharacterDashboardPage: ConnectedCharacterDashboardPage,

  Creators,
  Types,
  reducer,
};
