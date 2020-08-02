import React from "react";
import Login from "./pages/login";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "./actions/auth";
import { bindActionCreators } from "redux";

const App = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          props.logout();
        }}
      >
        Logout
      </button>
      <Switch>
        <Route exact path="/login/" component={Login} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
