import React from "react";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
import ChatContext from "./ChatContext.js";
import SearchContext from "./SearchContext.js";
export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <SearchContext.Consumer>
        {searchcontext => (
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
                        SEARCH={searchcontext}
                      />
                    )}
                  </AuthContext.Consumer>
                )}
              </SnackbarContext.Consumer>
            )}
          </ChatContext.Consumer>
        )}
      </SearchContext.Consumer>
    );
  };
}
