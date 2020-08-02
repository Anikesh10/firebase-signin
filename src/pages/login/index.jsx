import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { bindActionCreators } from "redux";

const Login = (props) => {
  console.log("props", props);
  if (props.ui.isLoggedIn) {
    const { from } = props.location.state || { from: { pathname: "/profile" } };
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={() => {
          props.login(true);
        }}
      >
        Login
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
