// @flow
import { createContext } from 'react';
import { Socket } from 'phoenix';

export function createSocketConnection() {
  const socket = new Socket('ws://localhost:4000/socket', {});
  socket.connect();
  return socket;
}

export const SocketContext = createContext(null);
