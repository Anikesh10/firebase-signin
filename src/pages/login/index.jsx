import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { bindActionCreators } from "redux";
import { PageWrapper, FormWrapper, Heading, HelperText } from "./styles";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import ValidationUtils from "../../lib/validationUtils";
import Loader from "../../components/Loader";

// Initial State
const INITIAL_STATE = {
  form: [
    {
      key: "email",
      label: "Email",
      value: "",
      error: "",
    },
    {
      key: "password",
      label: "Password",
      type: "password",
      value: "",
      error: "",
    },
  ],
};

const Login = (props) => {
  let [form, setFormData] = useState(INITIAL_STATE.form);
  //  Get validation error
  let getValidationError = (value, key) => {
    if (ValidationUtils.checkIfEmptyField(value))
      return "Please fill the field.";
    else if (ValidationUtils.checkIfspecialChar(value))
      return "Please do not enter special character.";
    else if (key === "email" && !ValidationUtils.validateEmail(value))
      return "Please enter a valid email.";
  };

  // Handle Input change
  let handleInputChange = (value, index, key) => {
    let formClone = JSON.parse(JSON.stringify(form));
    formClone[index]["value"] = value;
    formClone[index]["error"] = getValidationError(value, key);
    setFormData(formClone);
  };

  // Check if any input field has error
  let checkIfValid = () => {
    let flag = true;
    if (Array.isArray(form)) {
      for (let i = 0; i < form.length; i++) {
        if (form[i]["error"]) flag = false;
      }
    }
    return flag;
  };

  // Handle user login
  let handleLogin = () => {
    let data = {
      email: form[0].value,
      password: form[1].value,
    };
    if (checkIfValid()) {
      props.login(data);
    }
  };

  if (props.ui.isLoggedIn) {
    const { from } = props.location.state || { from: { pathname: "/profile" } };
    return <Redirect to={from} />;
  }

  return (
    <PageWrapper>
      {props.ui.isLoading && <Loader />}
      <FormWrapper>
        <Heading>Login</Heading>
        {Array.isArray(form)
          ? form.map((eachInput, index) => {
              let { key, label, type, value, error } = eachInput;
              return (
                <InputBox
                  key={key}
                  label={label}
                  type={type}
                  value={value}
                  error={error}
                  handleInput={(value) => handleInputChange(value, index, key)}
                />
              );
            })
          : null}
        <Button title="Login" label="Login" action={handleLogin} />
        <HelperText>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </HelperText>
      </FormWrapper>
    </PageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
