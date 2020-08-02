import * as types from "../actionTypes/ui";

const defaultState = {
  ui: {
    isLoading: true,
    error: false,
    isLoggedIn: true,
  },
  data: [],
};

const initialState = defaultState;

export default function match(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_LOADER:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        },
      };

    case types.STOP_LOADER:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
        },
      };

    case types.SET_ERROR:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
        },
      };

    case types.SET_LOGIN_STATUS:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoggedIn: action.status,
        },
      };

    default:
      return state;
  }
}
