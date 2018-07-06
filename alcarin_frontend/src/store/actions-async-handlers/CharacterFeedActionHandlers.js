import CharacterDashboard from '../../character_dashboard';
import Connection from '../../connection';

export async function fetchCharacterFeedHandler(dispatch, action) {
  try {
    const feed = await Connection.API.fetchCharacterFeed();
    dispatch(CharacterDashboard.Creators.fetchFeedSuccess(feed));
  } catch (err) {
    dispatch(CharacterDashboard.Creators.fetchFeedFail(err));
  }
}
