import React from "react";
// import { AppContext } from './ContextProvider'
import AuthContext from "./AuthContext.js";
import { Login } from "../actions/authActions.js";
import SnackBarMessage_Context from "./SnackBarMessage_Context.js";
export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <SnackBarMessage_Context.Consumer>
        {messageContext => (
          <AuthContext.Consumer>
            {context => (
              <Component
                {...props}
                context={context}
                message={messageContext}
              />
            )}
          </AuthContext.Consumer>
        )}
      </SnackBarMessage_Context.Consumer>
    );
  };
}
