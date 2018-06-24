import React from 'react';
import { CharacterDashboardPage } from './CharacterDashboardPage';
import { shallow } from 'enzyme';

function joinMock(triggerEvent) {
  const joinResult = {
    receive: jest.fn(function(type, callback) {
      type === triggerEvent ? callback() : void 0;
      return this;
    }),
  };
  return jest.fn().mockReturnValue(joinResult);
}

describe('Character dashboard page', () => {
  test('should try to connect to user channel on mount', () => {
    const joinResult = {
      receive: jest.fn(function() {
        return this;
      }),
    };
    const joinMock = jest.fn().mockReturnValue(joinResult);

    const socket = {
      channel: () => ({
        join: joinMock,
      }),
    };
    shallow(<CharacterDashboardPage socket={socket} />);
    expect(joinMock).toHaveBeenCalled();
    expect(joinResult.receive).toHaveBeenCalledWith('ok', expect.any(Function));
    expect(joinResult.receive).toHaveBeenCalledWith(
      'error',
      expect.any(Function)
    );
  });

  test('should leave channel when component unmount', () => {
    const leaveMock = jest.fn();

    const socket = {
      channel: () => ({
        join: joinMock(),
        leave: leaveMock,
      }),
    };
    const cmp = shallow(<CharacterDashboardPage socket={socket} />);
    cmp.unmount();

    expect(leaveMock).toHaveBeenCalled();
  });

  test('should render spinner before connection', () => {
    const socket = {
      channel: () => ({
        join: joinMock(),
      }),
    };
    const cmp = shallow(<CharacterDashboardPage socket={socket} />);
    expect(cmp.find('.spinner').length).toBe(1);
  });

  test('should render char dashboard when connected', () => {
    const socket = {
      channel: () => ({
        join: joinMock('ok'),
      }),
    };
    const cmp = shallow(<CharacterDashboardPage socket={socket} />);
    expect(cmp.find('.spinner').length).toBe(0);
    const feed = cmp.find('CharacterFeed');
    expect(feed.length).toBe(1);
  });
});
