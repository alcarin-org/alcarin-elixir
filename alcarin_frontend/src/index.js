import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const $root = document.getElementById('root');
ReactDOM.render(<App />, $root);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default;
        ReactDOM.render(
            <NextApp />,
            $root
        );
    });
}

registerServiceWorker();
