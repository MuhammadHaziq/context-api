import React, { useState, useLayoutEffect } from "react";
import withContext from "../context/ContextHOC.js";
import * as ACTIONS from "../actions/authActions";

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
      <div>Home</div>
    </React.Fragment>
  );
};

export default withContext(Home);
