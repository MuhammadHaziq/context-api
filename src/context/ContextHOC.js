import React from "react";
import AuthContext from "./AuthContext.js";
import SnackbarContext from "./SnackBarMessage_Context.js";
import ChatContext from "./ChatContext.js";
import SearchContext from "./SearchContext.js";
import FriendContext from "./FriendContext.js";
export default function withContext(Component) {
  return function contextComponent(props) {
    return (
      <SearchContext.Consumer>
        {searchcontext => (
          <ChatContext.Consumer>
            {chatcontext => (
              <SnackbarContext.Consumer>
                {messageContext => (
                  <FriendContext>
                    {friendContext => (
                      <AuthContext.Consumer>
                        {context => (
                          <Component
                            {...props}
                            context={context}
                            friends={friendContext}
                            message={messageContext}
                            chat={chatcontext}
                            search={searchcontext}
                          />
                        )}
                      </AuthContext.Consumer>
                    )}
                  </FriendContext>
                )}
              </SnackbarContext.Consumer>
            )}
          </ChatContext.Consumer>
        )}
      </SearchContext.Consumer>
    );
  };
}
