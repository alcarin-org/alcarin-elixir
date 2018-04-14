import { branch } from '../store/branch';
import TestComponent from '../components/Test';
import { join } from '../store/actions/character-feed';

export const Test = branch(
  { characterFeedConnected: 'characterFeedConnected' },
  { join },
  TestComponent
);
