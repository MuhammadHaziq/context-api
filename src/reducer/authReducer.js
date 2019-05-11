import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL
} from "../actions/allActionTypes.js";

const INITIAL_STATE = {
  auth: false
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth: true
      };
    }
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        auth: true
      };
    }
    case SIGNUP_FAIL:
      {
        return {
          ...state,
          auth: false
        };
      }
      break;
    default: {
      return {
        state
      };
    }
  }
};

export default authReducer;
