/**
 * "services" module provide common connection utilities that are unnecessery
 * to system working
 */

import Api, { type ApiFunctionType as _ApiFunctionType } from './Api';
import * as Socket from './Socket';

export type ApiFunctionType = _ApiFunctionType;
export default { Api, Socket };
