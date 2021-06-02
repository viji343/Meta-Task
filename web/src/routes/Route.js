import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import HomePage from "../modules/Home/HomePage";

const AppRoute = (props) => {
  return (
    <Router basename="/">
      <Switch>
        <Route path='*' component={HomePage} />
      </Switch>
    </Router>
  );
};

export default AppRoute;
