import { showLoader, stopLoader, changeLoginStatus } from "./ui";

export function login() {
  return (dispatch) => {
    dispatch(showLoader());

    dispatch(changeLoginStatus(true));

    dispatch(stopLoader());
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(showLoader());

    dispatch(changeLoginStatus(false));

    dispatch(stopLoader());
  };
}
