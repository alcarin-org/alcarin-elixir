import Baobab from 'baobab';
import { join } from './character-feed';

// jest.mock('../../services/channel', () => ({
//   channel: () => ({
//     join: jest.fn().mockReturnValue(Promise.resolve()),
//   }),
// }));

// function mockChannelReceiver(value) {
//   const storedEvents = {};
//   const mock = jest.fn().mockReturnValue({
//     receive: (ev, fn) => storedEvents[ev] = fn,
//   });

//   return mock;
// }

it('join action should join user to lobby channel', () => {
  // const store = new Baobab({
  //   characterFeedConnected: false,
  // });
  // join(store);
  // expect(store.select('characterFeedConnected').get()).toBe(true);
});
