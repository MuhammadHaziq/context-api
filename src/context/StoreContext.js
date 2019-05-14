import React from "react";
import authReducer from "../reducer/authReducer.js";
import messageReducer from "../reducer/messageReducer.js";
import AuthContext from "./AuthContext.js";
import * as ACTIONS from "../actions/authActions";
import { LOGIN_SUCCESS } from "../actions/allActionTypes.js";
// import { Login } from "../actions/authActions.js";
import SnackBarMessage_Context from "./SnackBarMessage_Context.js";
const StoreContext = props => {
  const INITIAL_STATE = {
    auth: false
  };
  const Message_State = {
    open: false,
    message: ""
  };
  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  const [messageState, messageDispatch] = React.useReducer(
    messageReducer,
    Message_State
  );

  return (
    <React.Fragment>
      <SnackBarMessage_Context.Provider
        value={{ ...messageState, messageDispatch }}
      >
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {props.children}
        </AuthContext.Provider>
      </SnackBarMessage_Context.Provider>
    </React.Fragment>
  );
};
export default StoreContext;

// <SnackBarMessage_Context value={{ ...messageState, messageDispatch }}>
// </SnackBarMessage_Context>
