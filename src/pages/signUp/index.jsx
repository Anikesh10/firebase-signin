import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../actions/auth";
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
      key: "firstName",
      label: "First Name*",
      value: "",
      error: "",
    },
    {
      key: "lastName",
      label: "Last Name*",
      value: "",
      error: "",
    },
    {
      key: "age",
      label: "Age*",
      value: "",
      error: "",
    },
    {
      key: "phone",
      label: "Phone number*",
      value: "",
      error: "",
    },
    {
      key: "address",
      label: "Address*",
      value: "",
      error: "",
    },
    {
      key: "email",
      label: "Email*",
      value: "",
      error: "",
    },
    {
      key: "password",
      label: "Password*",
      type: "password",
      value: "",
      error: "",
    },
  ],
};

const SignUp = (props) => {
  let [form, setFormData] = useState(INITIAL_STATE.form);

  //  Get validation error
  let getValidationError = (value, key) => {
    if (ValidationUtils.checkIfEmptyField(value.trim()))
      return "Please fill the field.";
    else if (ValidationUtils.checkIfspecialChar(value))
      return "Please do not enter special character.";
    else if (key === "email" && !ValidationUtils.validateEmail(value))
      return "Please enter a valid email address.";
    else if (key === "phone" && ValidationUtils.checkContactNumber(value))
      return "Please enter a valid phone number.";
    else if (key === "age" && !ValidationUtils.validateNumber(value))
      return "Please enter a valid age.";
  };

  // Handle Input change
  let handleInputChange = (value, index) => {
    let formClone = JSON.parse(JSON.stringify(form));
    formClone[index]["value"] = value;
    formClone[index]["error"] = getValidationError(
      value,
      formClone[index]["key"]
    );
    setFormData(formClone);
  };

  // Check if any input field has error
  let checkIfValid = () => {
    let flag = true;
    let formClone = JSON.parse(JSON.stringify(form));

    if (Array.isArray(form)) {
      for (let i = 0; i < form.length; i++) {
        let error = getValidationError(form[i]["value"], form[i]["key"]);
        if (error) {
          flag = false;
          formClone[i]["error"] = error;
        }
      }

      setFormData(formClone);
    }
    return flag;
  };

  let formatDataForApi = (form = []) => {
    let response = {};
    if (Array.isArray(form)) {
      form.forEach((eachElement) => {
        response = {
          ...response,
          [eachElement.key]: eachElement.value,
        };
      });
    }
    return response;
  };

  // Handle user login
  let handleSignUp = () => {
    if (checkIfValid()) {
      let data = formatDataForApi(form);
      props.signUp(data);
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
        <Heading>Sign Up</Heading>
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
                  handleInput={(value) => handleInputChange(value, index)}
                />
              );
            })
          : null}
        <Button title="Sign Up" label="Sign Up" action={handleSignUp} />
        <HelperText>
          Already have an account? <Link to="/login">Sign In</Link>
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
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
