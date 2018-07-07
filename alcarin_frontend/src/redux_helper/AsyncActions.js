// @flow

import { dissoc } from 'ramda';

import type {
  ActionDefinitionType,
  ActionType,
  ActionsDefType,
} from './Actions';
import type { ApiFunctionType } from '../connection';

type DispatchType = ActionType => ActionType;

export function asyncCallerMiddleware() {
  return (dispatch: DispatchType) => (action: ActionType) => {
    if (!action.__meta) {
      return dispatch(action);
    }

    const { apiFunction, createResponse } = action.__meta;

    if (apiFunction) {
      apiFunction(action.payload).then(response =>
        dispatch(createResponse(response))
      );
    }

    const serializableAction = dissoc('__meta', action);
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
      __meta: {
        apiFunction,
        createResponse: payload =>
          responseActionCreator(type.replace('_REQUEST', '_RESPONSE'), payload),
      },
    }),
    [`${name}Response`]: responseActionCreator,
  };
}
