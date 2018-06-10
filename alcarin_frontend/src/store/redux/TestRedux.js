import { createReducer, createActions } from 'reduxsauce';
import { assoc } from 'ramda';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  connect: null,
  connectionStateChanged: ['isConnected'],
});

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(
  { characterFeedConnected: false, inProgress: false },
  {
    [Types.CONNECT]: state => assoc('inProgress', true, state),
    [Types.CONNECTION_STATE_CHANGED]: (state, { isConnected }) =>
      assoc('characterFeedConnected', isConnected, state),
  }
);

// export const {action: CALL_REQ, dispatcher: callReq} = actionCreator('CALL_REQ');
// on(CALL_REQ, callReq);
