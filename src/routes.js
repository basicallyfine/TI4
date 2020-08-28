import React from "react";
import _ from 'lodash';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import RollingCalculator from './components/rolling-calculator';
import DiceChart from './components/dice-chart';

import './styles/app.css';

const history = createBrowserHistory();

export default () => {
  return (
  <Router history={history}>
      <Switch>
        <Route path="/roll-calculator" component={RollingCalculator} />
        <Route path="/" component={DiceChart} />
      </Switch>
  </Router>
  );
};
