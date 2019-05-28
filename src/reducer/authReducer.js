import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS
} from "../actions/allActionTypes.js";

const INITIAL_STATE = {
  auth: false,
  user: ""
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
        user: ""
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
