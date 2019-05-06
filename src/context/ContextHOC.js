import React from "react";
// import { AppContext } from './ContextProvider'
import AuthContext from "./AuthContext.js";

export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <AuthContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AuthContext.Consumer>
    );
  };
}
