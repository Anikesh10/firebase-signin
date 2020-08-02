import React from "react";
import { connect } from "react-redux";

const Profile = (props) => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default connect((state) => ({
  loggedIn: state.loggedIn,
}))(Profile);
