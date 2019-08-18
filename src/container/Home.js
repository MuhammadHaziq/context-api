import React, { useState, useLayoutEffect, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import withContext from "../context/ContextHOC.js";
import * as ACTIONS from "../actions/authActions";
import Message from "./messages/Message.js";
const Home = props => {
  useLayoutEffect(() => {
    if (localStorage.token) {
      ACTIONS.setCurrentUser(props.context.dispatch, localStorage.token);
    } else {
      props.history.replace("/login");
    }
  }, []);

  console.log(props.chat.show);
  console.log(props);
  return (
    <React.Fragment>
      {props.chat.show == true ? (
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-end"
        >
          <Message />{" "}
        </Grid>
      ) : (
        <div>Hello Home</div>
      )}
    </React.Fragment>
  );
};

export default withContext(Home);
