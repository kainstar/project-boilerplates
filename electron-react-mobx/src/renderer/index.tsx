import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';
import { configure } from 'mobx';

import Routes from './routes';
import store from './store';
import './app.global.scss';

configure({
  enforceActions: process.env.NODE_ENV !== 'production' ? 'observed' : 'never',
});

ReactDOM.render(
  <Provider {...store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>,
  document.getElementById('app'),
);
