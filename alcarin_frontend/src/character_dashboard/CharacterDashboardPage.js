// @flow

// { type ComponentType }

import React from 'react';
import { Socket, Channel } from 'phoenix';

import CharacterFeed from './character-feed/CharacterFeed';
import {
  PushNamespace,
  PushAction,
  type PushNamespaceType,
  type PushActionType,
} from './ChannelPushTypes';

type ComponentPropsType = {|
  onSubmit?: (state: string) => void,
  socket: Socket,
  fetchCharacterFeed: Function,
  putGameEvent: Function,
|};

type ComponentStateType = {|
  connected: boolean,
|};

export default class CharacterDashboardPage extends React.PureComponent<
  ComponentPropsType,
  ComponentStateType
> {
  state = { connected: false };
  channel: Channel = null;

  componentDidMount() {
    this.channel = this.props.socket.channel('character-feed:lobby');
    this.channel
      .join()
      .receive('ok', res => {
        console.info('Join character feed channel', res);
        this.setState({ connected: true });
        // dispatch(TestCreators.connectionStateChanged(true));
      })
      .receive('error', reason => {
        console.log('Unable to join to character feed channel', reason);
        // dispatch(TestCreators.connectionStateChanged(false));
      });
    this.props.fetchCharacterFeed();
  }

  componentWillUnmount() {
    this.channel.leave();
    console.info('Leave character feed channel');
  }

  sendMessage = (ns: PushNamespaceType, action: PushActionType, params) => {
    return this.channel.push(`${ns}:${action}`, params);
  };

  onSay = msg => {
    this.props.putGameEvent({
      type: 'speak',
      args: { content: msg.chatInput },
    });
    return this.sendMessage(PushNamespace.Communication, PushAction.Say, {
      content: msg.chatInput,
    })
      .receive('ok', console.log)
      .receive('error', console.error);
  };

  render() {
    return (
      <div className="page">
        {this.state.connected ? (
          <CharacterFeed
            gameEvents={this.props.gameEvents}
            onSubmit={this.onSay}
          />
        ) : (
          <span className="spinner">Connecting</span>
        )}
      </div>
    );
  }
}
