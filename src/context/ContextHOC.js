import React from "react";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
import ChatContext from "./ChatContext.js";
export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <ChatContext.Consumer>
        {chatcontext => (
          <SnackbarContext.Consumer>
            {messageContext => (
              <AuthContext.Consumer>
                {context => (
                  <Component
                    {...props}
                    context={context}
                    message={messageContext}
                    chat={chatcontext}
                  />
                )}
              </AuthContext.Consumer>
            )}
          </SnackbarContext.Consumer>
        )}
      </ChatContext.Consumer>
    );
  };
}
