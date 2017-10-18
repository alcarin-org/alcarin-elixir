import {init} from 'snabbdom';
import toVNode from 'snabbdom/tovnode';
import Component from './Component'
import store from './store';

const patch = init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);

const applyComponents = (queryEl, Component) => {
  store.subscribe(() => {
    const element = document.querySelector(queryEl);
    if (!element) {
      return console.warn(`Can't find ${queryEl}.`);
    }
    element.innerHTML = '';
    const child = document.createElement('div');
    element.append(child);

    const component = Component(store, {
      btnLabel: 'just test',
      checked: true,
    });
    patch(child, component);
  });
};

// execution later


var app = document.getElementById('app');
applyComponents('#app', Component);
store.dispatch({type: 'increase'});
