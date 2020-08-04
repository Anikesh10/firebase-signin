import * as types from "../actionTypes/ui";
import toastUtils from "../lib/toastUtils";

export function showLoader() {
  return {
    type: types.SHOW_LOADER,
  };
}

export function stopLoader() {
  return {
    type: types.STOP_LOADER,
  };
}

export function changeLoginStatus(status) {
  return {
    type: types.SET_LOGIN_STATUS,
    status,
  };
}

export function setError(error) {
  if (error) {
    toastUtils.handleToast({ operation: "error", message: error });
  }
  return {
    type: types.SET_ERROR,
    error,
  };
}
