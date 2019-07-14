import React, { Component } from 'react';
import Game from './components/Game';
import * as api from './api';

import './app.scss';

export default class App extends Component {
  componentDidMount() {
    api.success();
    api.failed();
    api.error();
  }

  render() {
    return <Game />;
  }
}
