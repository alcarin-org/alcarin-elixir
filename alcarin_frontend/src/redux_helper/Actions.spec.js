// @flow

import { createActions } from './Actions';

test('"createActions" should return prefixed types list for given definition', () => {
  const { Types } = createActions('testDomain', {
    action1: null,
    myAction2: { test: 5 },
  });
  expect(Types).toBeDefined();

  const actionNames = Object.keys(Types);
  expect(actionNames).toContain('ACTION1');
  expect(actionNames).toContain('MY_ACTION2');

  const actionValues = Object.values(Types);
  expect(actionValues).toContain('TEST_DOMAIN_ACTION1');
  expect(actionValues).toContain('TEST_DOMAIN_MY_ACTION2');
});

test('"createActions" should return action creaters for given definition', () => {
  const { Creators } = createActions('testDomain', {
    action1: null,
    myAction2: { test: 5 },
  });
  expect(Creators).toBeDefined();

  expect(typeof Creators.action1).toBe('function');
  expect(Creators.action1()).toEqual({
    type: 'TEST_DOMAIN_ACTION1',
    payload: {},
  });

  expect(typeof Creators.myAction2).toBe('function');
  expect(Creators.myAction2({ test: 321 })).toEqual({
    type: 'TEST_DOMAIN_MY_ACTION2',
    payload: {
      test: 321,
    },
  });
});

test('"createActions" should ignore namespace when it\'s empty', () => {
  const { Types, Creators } = createActions(null, {
    action1: null,
    myAction2: { test: 5 },
  });

  const actionValues = Object.values(Types);
  expect(actionValues).toContain('ACTION1');
  expect(actionValues).toContain('MY_ACTION2');

  expect(Creators).toBeDefined();

  expect(Creators.action1()).toEqual({
    type: 'ACTION1',
    payload: {},
  });

  expect(Creators.myAction2({ test: 321 })).toEqual({
    type: 'MY_ACTION2',
    payload: {
      test: 321,
    },
  });
});

test('"createActions" should accept creator function as definition object', () => {
  const { Creators } = createActions('testDomain', {
    fnAction: (type, payload) => ({
      type,
      payload,
      specialProperty: 333,
    }),
  });

  expect(typeof Creators.fnAction).toBe('function');
  expect(Creators.fnAction({ test: 321 })).toEqual({
    type: 'TEST_DOMAIN_FN_ACTION',
    payload: { test: 321 },
    specialProperty: 333,
  });
});
