import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import Routes from "./route/Routes.js";
import * as serviceWorker from "./serviceWorker";
import StoreContext from "./context/StoreContext.js";
import SetAuthorizeToken from "./utile/SetAuthorizeToken.js";
import * as ACTIONS from "./actions/authActions";

// import AuthContext from "./context/AuthContext.js";
// import authReducer from "./reducer/authReducer.js";

// const [state, dispatch] = React.useReducer(authReducer, INITIAL_STATE);
// const INITIAL_STATE = {
//   auth: false,
//   user: ""
// };
if (localStorage.token) {
  SetAuthorizeToken(localStorage.jwttoken);
  // ACTIONS.setCurrentUser(dispatch, localStorage.jwttoken);
}
ReactDOM.render(
  <StoreContext>
    <Routes />
  </StoreContext>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
