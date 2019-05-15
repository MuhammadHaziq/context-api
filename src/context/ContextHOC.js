import React from "react";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <SnackbarContext.Consumer>
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
      </SnackbarContext.Consumer>
    );
  };
}
