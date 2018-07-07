/**
 * character_dashboard module provide core features for
 * user character dashboard page
 */

// @flow

import CharacterDashboardPage from './CharacterDashboardPage';
import { connect } from 'react-redux';
import { Creators, Types, reducer } from './CharacterFeedRedux';

const ConnectedCharacterDashboardPage = connect(
  state => ({ gameEvents: state.characterFeed.gameEvents }),
  {
    fetchCharacterFeed: Creators.fetchFeedRequest,
    putGameEvent: Creators.putGameEvent,
  }
)(CharacterDashboardPage);

export {
  ConnectedCharacterDashboardPage as CharacterDashboardPage,
  Creators,
  Types,
  reducer,
};
