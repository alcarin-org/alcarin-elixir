import { Types as FeedTypes } from '../redux/CharacterFeedRedux';
import { fetchCharacterFeedHandler } from './CharacterFeedActionHandlers';

const AsyncActions = [[FeedTypes.FETCH_FEED, fetchCharacterFeedHandler]];

export default function asyncCallerMiddleware() {
  return next => action => {
    // call action all side-effects in the one place
    AsyncActions.forEach(([actionType, handler]) => {
      handler(next, action);
    });

    return next(action);
  };
}
