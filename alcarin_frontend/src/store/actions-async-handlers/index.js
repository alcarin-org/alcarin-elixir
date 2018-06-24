// import { Types as TestTypes } from '../redux/TestRedux';
// import { testActionHandler } from './TestActionHandler';

const AsyncActions = [
  // [TestTypes.Connect, testActionHandler]
];

export default function asyncCallerMiddleware() {
  return next => action => {
    // call action all side-effects in the one place
    AsyncActions.forEach(([actionType, handler]) => {
      handler(next, action);
    });

    return next(action);
  };
}
