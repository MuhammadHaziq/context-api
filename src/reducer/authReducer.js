import { LOGIN_SUCCESS } from "../actions/allActionTypes.js";

const INITIAL_STATE = {
  auth: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      {
        return {
          ...state,
          auth: true
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
