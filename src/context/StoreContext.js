import React from "react";
import authReducer from "../reducer/authReducer.js";
// const AuthContext = React.createContext({ Intial_State });
import AuthContext from "./AuthContext.js";
import * as ACTIONS from "../actions/authActions";
import { LOGIN_SUCCESS } from "../actions/allActionTypes.js";
const StoreContext = props => {
  const INITIAL_STATE = {
    auth: false
  };
  // // const Login = () => {//   console.log("login");
  // //   dispatch({ type: LOGIN_SUCCESS });
  // // };
  // const Login = () => {
  //   dispatch(ACTIONS.Login());
  // };

  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default StoreContext;
