import React from "react";
import _ from 'lodash';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import RollingCalculator from './components/rolling-calculator';

import './styles/app.css';

const history = createBrowserHistory();

export default () => {
  return (
  <Router history={history}>
      <Switch>
        <Route path="/" component={RollingCalculator} />
      </Switch>
  </Router>
  );
};
