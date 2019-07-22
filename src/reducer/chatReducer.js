import { CHAT_OPEN } from "../actions/allActionTypes.js";

const INITAIL_STATE = {
  show: false,
  message: [],
  email: ""
};

const chatReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case CHAT_OPEN: {
      return {
        ...state,
        show: true,
        email: action.response
      };
    }

    default: {
      return state;
    }
  }
};

export default chatReducer;
