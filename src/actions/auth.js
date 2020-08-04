import * as types from "../actionTypes/auth";
import auth from "../lib/auth";
import users from "../lib/users";
import toastUtils from "../lib/toastUtils";

export function recieveLogin(data) {
  return {
    type: types.RECEIVE_LOGIN,
    payload: data,
  };
}

export function requestLogin() {
  return {
    type: types.REQUEST_LOGIN,
  };
}

export function rejectedLogin(error) {
  toastUtils.handleToast({ operation: "error", message: error });
  return {
    type: types.REJECTED_LOGIN,
    payload: error,
  };
}

export function recieveLogout() {
  return {
    type: types.RECEIVE_LOGOUT,
    payload: {},
  };
}

export function requestLogout() {
  return {
    type: types.REQUEST_LOGOUT,
  };
}

export function rejectedLogout(error) {
  toastUtils.handleToast({ operation: "error", message: error });
  return {
    type: types.REJECTED_LOGOUT,
    payload: error,
  };
}

export function recieveProfileUpdate(response) {
  toastUtils.handleToast({
    operation: "success",
    message: "Profile updated successfully",
    autoClose: "2000",
  });
  return {
    type: types.RECIEVE_UPDATE_PROFILE,
    payload: response,
  };
}

export function requestProfileUpdate() {
  return {
    type: types.REQUEST_UPDATE_PROFILE,
  };
}

export function rejectedProfileUpdate(error) {
  toastUtils.handleToast({ operation: "error", message: error });
  return {
    type: types.REJECTED_UPDATE_PROFILE,
    payload: error,
  };
}

export function login(data) {
  return async (dispatch) => {
    dispatch(requestLogin());

    let signinResponse = await auth.signIn(data.email, data.password);
    if (signinResponse.isError) {
      dispatch(rejectedLogin(signinResponse.message));
    } else {
      let userData = await users.getUserDocument(signinResponse.user.uid);
      dispatch(recieveLogin(userData));
    }
  };
}

export function signUp(data) {
  return async (dispatch) => {
    dispatch(requestLogin());
    let signupResponse = await auth.signUp(data.email, data.password);

    if (signupResponse.isError) {
      dispatch(rejectedLogin(signupResponse.message));
    } else {
      let response = await users.postUserData(signupResponse.user, data);
      dispatch(recieveLogin(response));
    }
  };
}

export function signOut() {
  return async (dispatch) => {
    dispatch(requestLogout());

    let signoutResponse = await auth.signOut();
    if (signoutResponse && signoutResponse.isError) {
      dispatch(rejectedLogout(signoutResponse.message));
    } else {
      dispatch(recieveLogout());
    }
  };
}

export function updateProfile(uid, data) {
  return async (dispatch) => {
    dispatch(requestProfileUpdate());

    let response = await users.updateUserDocument(uid, data);
    if (response && response.isError) {
      dispatch(rejectedProfileUpdate(response.message));
    } else {
      dispatch(recieveProfileUpdate(response));
    }
  };
}
