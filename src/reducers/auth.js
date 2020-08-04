import * as types from "../actionTypes/auth";

const defaultState = {
  ui: {
    isLoading: true,
    error: false,
    isLoggedIn: true,
  },
  data: {},
};

const initialState = defaultState;

export default function match(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        },
      };

    case types.RECEIVE_LOGIN:
      console.log("action.payload", action.payload);
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
          isLoggedIn: true,
          error: "",
        },
        data: action.payload,
      };

    case types.REJECTED_LOGIN:
      return {
        ...state,
        ui: {
          ...state.ui,
          error: action.payload,
          isLoading: false,
        },
      };

    case types.REQUEST_LOGOUT:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        },
      };

    case types.RECEIVE_LOGOUT:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
          isLoggedIn: false,
          error: "",
        },
        data: action.payload,
      };

    case types.REJECTED_LOGOUT:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
          error: action.payload,
        },
      };

    case types.REQUEST_UPDATE_PROFILE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: true,
        },
      };

    case types.RECIEVE_UPDATE_PROFILE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
          isLoggedIn: true,
          error: "",
        },
        data: action.payload,
      };

    case types.REJECTED_UPDATE_PROFILE:
      return {
        ...state,
        ui: {
          ...state.ui,
          isLoading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}
