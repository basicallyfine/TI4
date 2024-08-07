import React from "react";
import _ from 'lodash';
import { Router, Route, Switch, Redirect } from "react-router";
import { createBrowserHistory } from "history";

// import Tech from './components/tech';
import DiceTable from './components/dice-table';
import MapBuilder from './components/map-builder';
import ListSystems from './components/list-systems';
import FactionSummaries from './components/faction-summaries';
import DsFactionSummaries from './components/faction-summaries-ds';
import BidDraftCombinator from './components/bid-draft-combinator';
import Wallpaper from './components/wallpaper';
import Async from './components/AsyncCommandRef';
import { SliceDisplay } from './components/SliceDisplay';

import './styles/app.scss';

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
              <Route path={`${BASE_PATH}/factions-ds/:codes?`} component={DsFactionSummaries} />
              <Route path={`${BASE_PATH}/bid-draft`} component={BidDraftCombinator} />
              <Route path={`${BASE_PATH}/wallpaper`} component={Wallpaper} />
              <Route path={`${BASE_PATH}/async`} component={Async} />
              <Route path={`${BASE_PATH}/slices`} component={SliceDisplay} />
              <Route path="/" component={() => <Redirect to={`${BASE_PATH}/factions`} />} />
            </Switch>
        </Router>
      </div>
      <div id="portal-modal" />
    </>
  );
};

export default Routes;