import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { HashRouter } from 'react-router-dom';

import Routes from './routes';
import store from './store';
import './app.global.scss';

const app = (
  <Provider {...store}>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
