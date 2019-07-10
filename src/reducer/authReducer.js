import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  CURRENT_USER_DETAIL,
  LOADER
} from "../actions/allActionTypes.js";

const INITIAL_STATE = {
  auth: false,
  user: "",
  userDetail: "",
  loader: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADER: {
      return {
        ...state,
        loader: action.response
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth: true,
        user: action.response
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        auth: false
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        auth: true,
        user: action.response
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        auth: false
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        auth: false,
        user: "",
        userDetail: ""
      };
    }
    case CURRENT_USER_DETAIL: {
      return {
        ...state,
        userDetail: action.response
      };
    }
    default: {
      return {
        state
      };
    }
  }
};

export default authReducer;
