// @flow

import {
  reduce,
  toPairs,
  assoc,
  replace,
  compose,
  toUpper,
  mapObjIndexed,
  concat,
  clone,
  is,
} from 'ramda';

// eslint-disable-next-line flowtype/require-exact-type
export type ActionType = { type: string, payload: Object };
type ActionCreatorType = (payload: ?Object) => ActionType;

export type ActionDefinitionType =
  | Object
  | ((type: string, payload: Object) => ActionType);

// eslint-disable-next-line flowtype/require-exact-type
export type ActionsDefType = {
  [actionName: string]: ?ActionDefinitionType,
};
type ReduxActionsType = {|
  Types: {
    [actionTypeName: string]: string,
  },
  Creators: {
    [actionName: string]: ActionCreatorType,
  },
|};

const isFunction = is(Function);
// matches on capital letters (except at the start & end of the string)
const RX_CAPS = /(?!^)([A-Z])/g;

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
const camelToScreamingSnake = compose(
  toUpper,
  replace(RX_CAPS, '_$1')
);

export function createActions(
  prefix: ?string,
  actionsDef: ActionsDefType
): ReduxActionsType {
  const definitionPairs = toPairs(actionsDef);
  const actionTypes = mapObjIndexed(
    (_, key) => camelToScreamingSnake(key),
    actionsDef
  );

  const addPrefix = concat(prefix ? camelToScreamingSnake(prefix + '_') : '');

  const actionFactory = (key, def) => {
    const actionType = addPrefix(actionTypes[key]);
    return isFunction(def)
      ? payload => def(actionType, payload)
      : payload => ({
          type: actionType,
          payload: def ? Object.assign(clone(def), payload) : {},
        });
  };

  return {
    Types: reduce(
      (acc, [key, def]) =>
        assoc(actionTypes[key], addPrefix(actionTypes[key]), acc),
      {},
      definitionPairs
    ),
    Creators: reduce(
      (acc, [key, def]) => assoc(key, actionFactory(key, def), acc),
      {},
      definitionPairs
    ),
  };
}
