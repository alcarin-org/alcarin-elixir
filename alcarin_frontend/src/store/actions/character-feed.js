import { add } from 'ramda';
import { channel } from '../../services/channel';

export function increase(store) {
  store.select('counter').apply(add(1));
}

export function join(store) {
  return channel()
    .join()
    .receive('ok', resp => {
      console.log('Joined successfully', resp);
      store.select('characterFeedConnected').set(true);
    })
    .receive('error', resp => {
      console.log('Unable to join', resp);
      store.select('characterFeedConnected').set(false);
    });
}
