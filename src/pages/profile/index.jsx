import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut, signUp, updateProfile } from "../../actions/auth";
import { bindActionCreators } from "redux";
import {
  PageWrapper,
  FormWrapper,
  Heading,
  ButtonWrapper,
  HeaderWrapper,
  HeadingHelper,
  Name,
} from "./styles";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import ValidationUtils from "../../lib/validationUtils";
import Avatar from "../../components/Avatar";
import UploadUtils from "../../lib/uploadUtils";
import toastUtils from "../../lib/toastUtils";
import Loader from "../../components/Loader";

// Initial State
const INITIAL_STATE = {
  form: [
    {
      key: "profileImage",
      value: "",
      error: "",
    },
    {
      key: "firstName",
      label: "First Name",
      value: "",
      error: "",
    },
    {
      key: "lastName",
      label: "Last Name",
      value: "",
      error: "",
    },
    {
      key: "age",
      label: "Age",
      value: "",
      error: "",
    },
    {
      key: "phone",
      label: "Phone number",
      value: "",
      error: "",
    },
    {
      key: "address",
      label: "Address",
      value: "",
      error: "",
    },
    {
      key: "email",
      label: "Email",
      value: "",
      error: "",
      disabled: true,
    },
  ],
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setProfileData();
  }

  setProfileData = () => {
    let { data } = this.props;
    let updatedForm = [];
    if (Array.isArray(this.state.form) && this.state.form.length && data) {
      updatedForm = this.state.form.map((eachElement) => ({
        ...eachElement,
        value: data[eachElement.key],
      }));
    }
    this.setState({
      form: updatedForm,
    });
  };

  getValidationError = (value, key) => {
    if (ValidationUtils.checkIfEmptyField(value))
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
  handleInputChange = (value, index) => {
    let formClone = JSON.parse(JSON.stringify(this.state.form));
    formClone[index]["value"] = value;
    formClone[index]["error"] = this.getValidationError(
      value,
      formClone[index]["key"]
    );
    this.setState({
      form: formClone,
    });
  };

  // Check if any input field has error
  checkIfValid = () => {
    let { form } = this.state;
    let flag = true;
    if (Array.isArray(form)) {
      for (let i = 0; i < form.length; i++) {
        if (form[i]["error"]) flag = false;
      }
    }
    return flag;
  };

  // Format data for save api
  formatDataForApi = (form = [], previousData) => {
    let response = {};
    if (Array.isArray(form)) {
      form.forEach((eachElement) => {
        // Send data only if field value has been changed
        if (previousData[eachElement.key] !== eachElement.value) {
          response = {
            ...response,
            [eachElement.key]: eachElement.value,
          };
        }
      });
    }
    return response;
  };

  // Save formatted data
  handleSave = () => {
    let { form } = this.state;
    let data = this.formatDataForApi(form, this.props.data);
    if (this.props.data.uid) {
      this.props.updateProfile(this.props.data.uid, data);
    }
  };

  _getIndexOfKey = (fieldKey, data = []) => {
    let fieldIndex;
    if (Array.isArray(data)) {
      data.forEach(({ key }, index) => {
        if (fieldKey === key) {
          fieldIndex = index;
        }
      });
    }
    return fieldIndex;
  };

  _getFullName = () => {
    let { form } = this.state;
    let fullName = "";
    if (Array.isArray(form) && form.length) {
      form.forEach((eachField) => {
        if (eachField.key === "firstName") {
          fullName = `${eachField.value}`;
        } else if (eachField.key === "lastName") {
          fullName = `${fullName} ${eachField.value}`;
        }
      });
    }
    return fullName;
  };

  setProfileImage = (url) => {
    let cloneForm = JSON.parse(JSON.stringify(this.state.form));
    let fieldIndex = this._getIndexOfKey("profileImage", cloneForm);
    cloneForm[fieldIndex]["value"] = url;
    this.setState({
      form: cloneForm,
    });
  };

  onFileSelect = async (fileBlob) => {
    let { uid } = this.props.data;
    if (uid) {
      let response = await UploadUtils.handleFireBaseUpload(fileBlob, uid);
      if (response && !response.isError) {
        this.setProfileImage(response);
      } else {
        toastUtils.handleToast({
          operation: "error",
          message: response.message,
        });
      }
    }
  };

  render() {
    let { form } = this.state;
    return (
      <PageWrapper>
        {this.props.ui.isLoading && <Loader />}
        <HeaderWrapper>
          <div>
            <Heading>Profile</Heading>
            <HeadingHelper>
              Hello, <Name>{this._getFullName()}. </Name>
              Edit your profile information below.
            </HeadingHelper>
          </div>
          <ButtonWrapper>
            <Button
              title="Log out"
              label="Log out"
              action={this.props.signOut}
            />
          </ButtonWrapper>
        </HeaderWrapper>
        <FormWrapper>
          {Array.isArray(form)
            ? form.map((eachInput, index) => {
                let { key, label, type, value, error, disabled } = eachInput;
                if (key === "profileImage") {
                  return (
                    <Avatar
                      name={this._getFullName()}
                      onFileSelect={this.onFileSelect}
                      image={value}
                    />
                  );
                }
                return (
                  <InputBox
                    key={key}
                    label={label}
                    type={type}
                    value={value}
                    error={error}
                    disabled={disabled}
                    handleInput={(value) =>
                      this.handleInputChange(value, index)
                    }
                  />
                );
              })
            : null}
          <Button title="Save" label="Save" action={this.handleSave} />
        </FormWrapper>
      </PageWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp, signOut, updateProfile }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
