import React from "react";
import authReducer from "../reducer/authReducer.js";
import messageReducer from "../reducer/messageReducer.js";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
import * as ACTIONS from "../actions/authActions";
import SetAuthorizeToken from "../utile/SetAuthorizeToken.js";
import chatReducer from "../reducer/chatReducer.js";
import ChatContext from "./ChatContext.js";
import searchReducer from "../reducer/searchReducer.js";
import SearchContext from "./SearchContext.js";
const StoreContext = props => {
  const INITIAL_STATE = {
    auth: false,
    user: "",
    userDetail: "",
    loader: false
  };
  const Message_State = {
    open: false,
    message: ""
  };
  const Chat_State = {
    show: false,
    message: [],
    email: ""
  };
  const search_state = {
    show: false,
    search: [],
    email: ""
  };
  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  // if (localStorage.token) {
  //   SetAuthorizeToken(localStorage.token);
  //   ACTIONS.setCurrentUser(dispatch, localStorage.token);
  // }

  const [messageState, messageDispatch] = React.useReducer(
    messageReducer,
    Message_State
  );
  const [searchState, searchDispatch] = React.useReducer(
    searchReducer,
    search_state
  );

  const [chatState, chatDispatch] = React.useReducer(chatReducer, Chat_State);

  return (
    <React.Fragment>
      <SearchContext.Provider value={{ ...search_state, searchDispatch }}>
        <ChatContext.Provider value={{ ...chatState, chatDispatch }}>
          <SnackbarContext.Provider
            value={{ ...messageState, messageDispatch }}
          >
            <AuthContext.Provider value={{ ...state, dispatch }}>
              {props.children}
            </AuthContext.Provider>
          </SnackbarContext.Provider>
        </ChatContext.Provider>
      </SearchContext.Provider>
    </React.Fragment>
  );
};
export default StoreContext;

// <SearchContext.provider value={{ ...searchState, searchDispatch }}>
// <SnackBarMessage_Context value={{ ...messageState, messageDispatch }}>
// </SnackBarMessage_Context>

// </SearchContext.provider>
