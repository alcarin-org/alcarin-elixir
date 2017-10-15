import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver, a, img, h, input, div, button} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import {prop} from 'ramda';

function renderDOM(checked) {
  return div([
    img({props: {src: 'http://brunch.io/images/logo.png'}}),
    h('label', [
      input({props: {type: 'checkbox', checked: checked}}),
      checked ? 'checked' : 'unchecked'
    ]),
    button('#clickme', 'click me')
  ]);
}

function main(sources) {
  const inputChecked$ = sources.DOM.select('input').events('change').map(
    (input) => input.target.checked
  ).startWith(false);

  const clicks$ = sources.DOM.select('#clickme').events('click');

  const res$ = sources.HTTP.select('users').flatten().map(prop('body')).debug('me').subscribe({})
  return {
    DOM: inputChecked$.map(renderDOM),
    HTTP: clicks$.map(() => ({
        url: 'https://jsonplaceholder.typicode.com/users/' + String(6),
        category: 'users',
        method: 'GET'
    }))
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
};

run(main, drivers);
