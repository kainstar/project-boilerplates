import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/home';
import CounterPage from './pages/counter';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/counter" component={CounterPage} />
    </Switch>
  );
};
