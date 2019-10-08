import { GET_ALL_FRIENDS, REMOVE_ALL_FRIENDS } from "../actions/allActionTypes";

const Initial_State = {
  friendList: []
};

const friendReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case GET_ALL_FRIENDS: {
      return {
        ...state,
        friendList: action.response
      };
    }
    case REMOVE_ALL_FRIENDS: {
      return Object.assign(state, {}, { friendList: [] });
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default friendReducer;
