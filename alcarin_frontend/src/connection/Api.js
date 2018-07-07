// @flow

const ServerAddress = 'http://localhost:4000';

export default {
  fetchCharacterFeed() {
    return request('/api/character/0/feed');
  },
};

export type ApiResponseType = {|
  status: number,
  body: Object,
|};
export type ApiFunctionType = (payload: ?Object) => Promise<ApiResponseType>;

const defaultFetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function request(url: string, params: ?Object): Promise<ApiResponseType> {
  return fetch(
    ServerAddress + url,
    Object.assign({}, defaultFetchOptions, params || {})
  ).then(function(res) {
    return res.json().then(json => ({
      status: res.status,
      body: json,
    }));
  });
}
