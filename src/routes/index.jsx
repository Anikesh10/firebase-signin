import React from "react";
import Login from "../pages/login";
import Profile from "../pages/profile";
import SignUp from "../pages/signUp";
import ProtectedRoute from "../components/ProtectedRoute";
import { Switch, Redirect, Route } from "react-router-dom";

const Routes = (props) => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <Redirect exact from="/" to="/login" />
    <Redirect to="/login" />
  </Switch>
);

export default Routes;
