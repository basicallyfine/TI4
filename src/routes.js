import React from "react";
import _ from 'lodash';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import DiceTable from './components/dice-table';
import MapBuilder from './components/map-builder';
import ListSystems from './components/list-systems';
import FactionSummaries from './components/faction-summaries';
import BidDraftCombinator from './components/bid-draft-combinator';

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
              <Route path={`${BASE_PATH}/list-systems`} component={ListSystems} />
              <Route path={`${BASE_PATH}/factions/:codes?`} component={FactionSummaries} />
              <Route path={`${BASE_PATH}/bid-draft`} component={BidDraftCombinator} />
              <Route path="/" component={() => <Redirect to={`${BASE_PATH}/factions`} />} />
            </Switch>
        </Router>
      </div>
      <div id="portal-modal" />
    </>
  );
};

export default Routes;