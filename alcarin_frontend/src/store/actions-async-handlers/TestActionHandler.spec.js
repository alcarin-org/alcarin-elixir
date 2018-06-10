import { testActionHandlerHelper } from './TestActionHandler';
import { Creators as TestCreators } from '../redux/TestRedux';

// function mockChannelReceiver(value) {
//   const storedEvents = {};
//   const mock = jest.fn().mockReturnValue({
//     receive: (ev, fn) => storedEvents[ev] = fn,
//   });

//   return mock;
// }
const mockChannel = triggerEvent => () => ({
  join: () => ({
    receive(ev, handler) {
      ev === triggerEvent && handler();
      return this;
    },
  }),
});

it('join action should join user to lobby channel', () => {
  const dispatch = jest.fn();
  const channel = mockChannel('ok');
  testActionHandlerHelper(channel, dispatch, {});
  expect(dispatch).toHaveBeenCalledWith(
    TestCreators.connectionStateChanged(true)
  );
});

it('join action should reject user', () => {
  const dispatch = jest.fn();
  const channel = mockChannel('error');
  testActionHandlerHelper(channel, dispatch, {});
  expect(dispatch).toHaveBeenCalledWith(
    TestCreators.connectionStateChanged(false)
  );
});
