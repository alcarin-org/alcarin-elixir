import { Creators as FeedActions } from '../redux/CharacterFeedRedux';
import API from '../../services/API';

export async function fetchCharacterFeedHandler(dispatch, action) {
  try {
    const feed = await API.fetchCharacterFeed();
    dispatch(FeedActions.fetchFeedSuccess(feed));
  } catch (err) {
    dispatch(FeedActions.fetchFeedFail(err));
  }
}
