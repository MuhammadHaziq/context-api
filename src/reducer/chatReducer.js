import { CHAT_OPEN, SEND_MESSAGE } from "../actions/allActionTypes.js";

const INITAIL_STATE = {
  show: false,
  message: [],
  chat_data: ""
};

const chatReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case CHAT_OPEN: {
      return {
        ...state,
        show: true,
        chat_data: action.data,
        message: action.response
      };
    }
    case SEND_MESSAGE: {
      return {
        ...state
        // message: [...(state.message || []), action.response]
      };
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
