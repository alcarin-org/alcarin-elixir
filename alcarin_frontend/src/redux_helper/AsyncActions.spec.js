// @flow

import { createAPICallActions } from './AsyncActions';
import { createActions } from './Actions';

test('createAPICallActions() should prepare definition for two actions, req and res', () => {
  const fetchUsersFromServerMock = jest.fn();
  const apiCallsActions = createAPICallActions(
    'fetchUsers',
    fetchUsersFromServerMock,
    {
      authorized: true,
    }
  );
  const actionNames = Object.keys(apiCallsActions);
  expect(actionNames).toContain('fetchUsersRequest');
  expect(actionNames).toContain('fetchUsersResponse');

  expect(typeof apiCallsActions.fetchUsersRequest).toBe('function');
  expect(typeof apiCallsActions.fetchUsersResponse).toBe('function');

  // $FlowFixMe
  const resultAction = apiCallsActions.fetchUsersRequest('TEST', {});
  expect(typeof resultAction.__meta.createResponse).toBe('function');
});

test('createAPICallActions() should provide data in form understandable for createActions()', () => {
  const fetchUsersFromServerMock = jest.fn();
  const apiCallsActions = createAPICallActions(
    'fetchUsers',
    fetchUsersFromServerMock,
    {
      authorized: true,
    }
  );
  const { Types, Creators } = createActions(null, apiCallsActions);

  expect(Types).toEqual({
    FETCH_USERS_REQUEST: 'FETCH_USERS_REQUEST',
    FETCH_USERS_RESPONSE: 'FETCH_USERS_RESPONSE',
  });

  expect(typeof Creators.fetchUsersRequest).toBe('function');

  const requestAction = Creators.fetchUsersRequest();
  expect(requestAction).toMatchObject({
    type: 'FETCH_USERS_REQUEST',
    payload: { authorized: true },
    __meta: {
      apiFunction: fetchUsersFromServerMock,
    },
  });

  expect(Creators.fetchUsersRequest({ authorized: false })).toMatchObject({
    type: 'FETCH_USERS_REQUEST',
    payload: { authorized: false },
    __meta: {
      apiFunction: fetchUsersFromServerMock,
    },
  });

  expect(typeof Creators.fetchUsersResponse).toBe('function');
  expect(
    Creators.fetchUsersResponse({ status: 200, body: { test: 321 } })
  ).toEqual({
    type: 'FETCH_USERS_RESPONSE',
    payload: { test: 321 },
    error: false,
  });
  expect(
    Creators.fetchUsersResponse({ status: 500, body: { err: 'err msg' } })
  ).toEqual({
    type: 'FETCH_USERS_RESPONSE',
    payload: { err: 'err msg' },
    error: true,
  });
});

test('createAPICallActions() should prepare proper action for empty payload', () => {
  const fetchUsersFromServerMock = jest.fn();
  const apiCallsActions = createAPICallActions(
    'fetchUsers',
    fetchUsersFromServerMock
  );
  const { Creators } = createActions(null, apiCallsActions);

  const actionNames = Object.keys(apiCallsActions);
  expect(actionNames).toContain('fetchUsersRequest');
  expect(actionNames).toContain('fetchUsersResponse');

  expect(Creators.fetchUsersRequest()).toMatchObject({
    type: 'FETCH_USERS_REQUEST',
    payload: {},
    __meta: { apiFunction: fetchUsersFromServerMock },
  });
});
