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
  // // const Login = () => {//   console.log("login");
  // //   dispatch({ type: LOGIN_SUCCESS });
  // // };
  // const Login = () => {
  //   dispatch(ACTIONS.Login());
  // };

  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  // const [messageState, messageDispatch] = React.useReducer(
  //   messageReducer,
  //   Message_State
  // );

  return (
    <React.Fragment>
        <AuthContext.Provider value={{ ...state, dispatch }}>
          {props.children}
        </AuthContext.Provider>
    </React.Fragment>
  );
};
export default StoreContext;

// <SnackBarMessage_Context value={{ ...messageState, messageDispatch }}>
// </SnackBarMessage_Context>
