import React from "react";
import _ from 'lodash';
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import DiceTable from './components/dice-table';
import FactionDeal from './components/faction-shuffle';

import './styles/app.css';

const history = createBrowserHistory();

export default () => {
  return (
  <Router history={history}>
      <Switch>
        <Route path="/TI4/factions/:keys?" component={FactionDeal} />
        <Route path="/" component={DiceTable} />
      </Switch>
  </Router>
  );
};
