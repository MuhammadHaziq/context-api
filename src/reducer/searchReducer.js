import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  CLOSE_MESSAGE,
  SEARCH_RESULT
} from "../actions/allActionTypes";

const INITAIL_STATE = {
  show: false,
  search: [],
  email: ""
};
const searchReducer = (state = INITAIL_STATE, action) => {
  switch (action.type) {
    case SEARCH_RESULT: {
      return {
        ...state,
        search: []
      };
    }
    default:
      return {
        ...state
      };
      break;
  }
};
export default searchReducer;
