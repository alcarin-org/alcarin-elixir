import React from 'react';
import PropTypes from 'prop-types';
import Baobab from 'baobab';
import { mapObjIndexed, curry } from 'ramda';
import { StoreContext } from './Store';

export const branch = curry(branchCmp);

const branchedCmpPropTypes = {
  store: PropTypes.instanceOf(Baobab).isRequired,
  sourceProps: PropTypes.object.isRequired,
};

function branchCmp(storePropsMap, storeActionsMap, Component) {
  class BranchedComponent extends React.PureComponent {
    static propTypes = branchedCmpPropTypes;

    constructor(props) {
      super(props);

      this.__watcher = this.props.store.watch(storePropsMap);
      this.state = {
        storeProps: this.__watcher.get(),
        storeActions: mapObjIndexed(
          action => args => action(this.props.store, args),
          storeActionsMap
        ),
      };
      this.__watcher.on('update', ({ target }) =>
        this.setState({ storeProps: target.get() })
      );
    }

    componentWillUnmount() {
      this.__watcher.release();
    }

    render() {
      return (
        <StoreContext.Consumer>
          {({ store }) => (
            <Component
              {...this.props.sourceProps}
              {...this.state.storeProps}
              {...this.state.storeActions}
            />
          )}
        </StoreContext.Consumer>
      );
    }
  }

  return function RenderBranchedComponent(props) {
    return (
      <StoreContext.Consumer>
        {({ store }) => <BranchedComponent store={store} sourceProps={props} />}
      </StoreContext.Consumer>
    );
  };
}
