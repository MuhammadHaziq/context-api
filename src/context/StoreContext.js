import React from "react";
import authReducer from "../reducer/authReducer.js";
import messageReducer from "../reducer/messageReducer.js";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
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
      <SnackbarContext.Provider value={{ ...messageState, messageDispatch }}>
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {props.children}
        </AuthContext.Provider>
      </SnackbarContext.Provider>
    </React.Fragment>
  );
};
export default StoreContext;

// <SnackBarMessage_Context value={{ ...messageState, messageDispatch }}>
// </SnackBarMessage_Context>
