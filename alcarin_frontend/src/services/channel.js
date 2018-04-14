import { Socket } from 'phoenix';
import { once, memoizeWith, identity } from 'ramda';

// channel.push('msg', { msg: 'go out' });

export const socket = once(() => {
  const socket = new Socket('ws://localhost:4000/socket', {});
  socket.connect();
  return socket;
});

export const channel = memoizeWith(identity, (charId = 'lobby') =>
  socket().channel(`character-feed:${charId}`, {})
);
