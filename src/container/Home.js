import React, { useState, useLayoutEffect, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import withContext from "../context/ContextHOC.js";
import * as ACTIONS from "../actions/authActions";
import Message from "./messages/Message.js";
import MessageInput from "./MessageInput.js";
const Home = props => {
  useLayoutEffect(() => {
    if (localStorage.token) {
      ACTIONS.setCurrentUser(props.context.dispatch, localStorage.token);
    } else {
      props.history.replace("/login");
    }
  }, []);

  return (
    <React.Fragment>
      {props.chat.show == true ? (
        <Message />
      ) : (
        <div>Hello {props.context.userDetail.username}</div>
      )}
    </React.Fragment>
  );
};

export default withContext(Home);
