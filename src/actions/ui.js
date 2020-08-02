import * as types from "../actionTypes/ui";

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
