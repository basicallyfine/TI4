import React from "react";
import _ from 'lodash';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import DiceTable from './components/dice-table';
import MapBuilder from './components/map-builder';
import FactionSummaries from './components/faction-summaries';

import './styles/app.css';

const history = createBrowserHistory();

const BASE_PATH = '';

const Routes = () => {
  return (
    <>
      <div id="app-wrapper">
        <Router history={history}>
            <Switch>
              <Route path={`${BASE_PATH}/dice`} component={DiceTable} />
              <Route path={`${BASE_PATH}/map-builder`} component={MapBuilder} />
              <Route path={`${BASE_PATH}/factions/:codes?`} component={FactionSummaries} />
              <Route path="/" component={() => <Redirect to={`${BASE_PATH}/dice`} />} />
            </Switch>
        </Router>
      </div>
      <div id="portal-modal" />
    </>
  );
};

export default Routes;