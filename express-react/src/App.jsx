import React, { Component } from 'react';
import Game from './component/Game';
import * as api from './api';

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
