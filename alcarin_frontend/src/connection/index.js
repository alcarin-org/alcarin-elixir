// @flow

/**
 * "connection" module provide common connection utilities that are unnecessery
 * for system to work
 */

import Api, { type ApiFunctionType as _ApiFunctionType } from './Api';
import * as Socket from './Socket';

export type ApiFunctionType = _ApiFunctionType;
export { Api, Socket };
