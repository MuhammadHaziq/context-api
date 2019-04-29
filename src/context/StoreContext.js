import React from "react";
import authReducer from "../reducer/authReducer.js";
// const AuthContext = React.createContext({ Intial_State });
import AuthContext from "./AuthContext.js";
import { LOGIN_SUCCESS } from "../actions/allActionTypes.js";
const StoreContext = props => {
  const INITIAL_STATE = {
    auth: false
  };
  const Login = () => {
    console.log("login");
    dispatch({ type: LOGIN_SUCCESS });
  };
  const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
  // console.log(dispatch({ type: LOGIN_SUCCESS }));
  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, Login }}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default StoreContext;
