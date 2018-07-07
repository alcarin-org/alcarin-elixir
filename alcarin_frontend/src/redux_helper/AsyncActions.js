// @flow

import { dissoc } from 'ramda';

import type {
  ActionsDefType,
  ActionDefinitionType,
  ActionType,
} from './ActionHelpers';
import type { ApiFunctionType } from '../connection';

type AsyncActionType = ActionType & {
  __async_meta: {
    apiFunction: ApiFunctionType,
    createResponse: Object => ActionType,
  },
};
type DispatchType = ActionType => ActionType;

export function asyncCallerMiddleware() {
  return (dispatch: DispatchType) => (action: AsyncActionType) => {
    if (!action.__async_meta) {
      return dispatch(action);
    }

    const { apiFunction, createResponse } = action.__async_meta;

    if (apiFunction) {
      apiFunction(action.payload).then(response =>
        dispatch(createResponse(response))
      );
    }

    const serializableAction = dissoc('__async_meta', action);
    return dispatch(serializableAction);
  };
}

export function createAPICallActions(
  name: string,
  apiFunction: ApiFunctionType,
  payloadDef: ?ActionDefinitionType
): ActionsDefType {
  const responseActionCreator = (type, { body, status }) => ({
    type,
    payload: body,
    error: status >= 400,
  });
  return {
    [`${name}Request`]: (type, payload) => ({
      type,
      payload: Object.assign(payloadDef || {}, payload || {}),
      __async_meta: {
        apiFunction,
        createResponse: payload =>
          responseActionCreator(type.replace('_REQUEST', '_RESPONSE'), payload),
      },
    }),
    [`${name}Response`]: responseActionCreator,
  };
}
