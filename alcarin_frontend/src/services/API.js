const ServerAddress = 'http://localhost:4000';

export default {
  fetchCharacterFeed() {
    return request('/api/character/0/feed');
  },
};

const defaultFetchOptions = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function request(url, params) {
  return fetch(
    ServerAddress + url,
    Object.assign({}, defaultFetchOptions, params)
  ).then(function(res) {
    return res.status >= 400
      ? Promise.reject({
          status: res.status,
          body: res.json(),
        })
      : res.json();
  });
}
