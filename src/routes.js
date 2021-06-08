import React from "react";
import _ from 'lodash';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import DiceTable from './components/dice-table';
import MapBuilder from './components/map-builder';

import './styles/app.css';

const history = createBrowserHistory();

export default () => {
  return (
  <Router history={history}>
      <Switch>
        <Route path="/TI4/dice" component={DiceTable} />
        <Route path="/TI4/map-builder" component={MapBuilder} />
        <Route path="/" component={() => <Redirect to="/TI4/dice" />} />
      </Switch>
  </Router>
  );
};
