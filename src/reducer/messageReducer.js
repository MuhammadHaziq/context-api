import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  CLOSE_MESSAGE
} from "../actions/allActionTypes";

const INITIAL_STATE = {
  open: false,
  message: ""
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_MESSAGE: {
      return {
        ...state,
        open: true,
        message: action.response
      };
    }
    case SUCCESS_MESSAGE: {
      return {
        ...state,
        open: true,
        message: action.response
      };
    }
    case CLOSE_MESSAGE: {
      return {
        ...state,
        open: false
      };
    }
    default: {
      return {
        state
      };
    }
  }
};
export default messageReducer;
