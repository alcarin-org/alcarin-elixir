import { add } from 'ramda';

export function increase(store) {
  store.select('counter').apply(add(1));
}
