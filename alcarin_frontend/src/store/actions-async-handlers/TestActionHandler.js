// import { Creators as TestCreators } from '../redux/TestRedux';
// import { channel } from '../../services/channel';
// import { curry } from 'ramda';

// export const testActionHandlerHelper = curry((channel, dispatch, action) => {
//   return channel()
//     .join()
//     .receive('ok', resp => {
//       console.log('Joined successfully', resp);
//       dispatch(TestCreators.connectionStateChanged(true));
//     })
//     .receive('error', resp => {
//       console.log('Unable to join', resp);
//       dispatch(TestCreators.connectionStateChanged(false));
//     });
// });
// export const testActionHandler = testActionHandlerHelper(channel);
