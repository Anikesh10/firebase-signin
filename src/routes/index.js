import React from "react";
import { changeLoggedIn } from "./actions";

const App = (props) => {
  return (
    <div>
      <Nav />
      <button
        onClick={() => {
          props.changeLoggedIn(false);
        }}
      >
        Logout
      </button>
      <Switch>
        <Route exact path="/friends/" component={Friends} />
        <Route exact path="/books/" component={Books} />
        <Redirect exact from="/" to="/friends/" />
      </Switch>
    </div>
  );
};

export default connect(
  (state) => ({
    loggedIn: state.loggedIn,
  }),
  {
    changeLoggedIn,
  }
)(App);
