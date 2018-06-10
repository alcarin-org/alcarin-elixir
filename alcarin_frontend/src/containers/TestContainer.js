import { connect } from 'react-redux';

import Test from '../components/Test';
import { Creators as TestActions } from '../store/redux/TestRedux';

export const TestContainer = connect(
  state => ({
    inProgress: state.test.inProgress,
    characterFeedConnected: state.test.characterFeedConnected,
  }),
  { join: TestActions.connect }
)(Test);
