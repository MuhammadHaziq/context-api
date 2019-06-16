import React, { useState, useLayoutEffect, useEffect } from "react";
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

  // useEffect(() => {
  //   const data = {
  //     id: props.context.user.id
  //   };
  //   ACTIONS.get_User_Current_Detail(
  //     data,
  //     props.context.dispatch,
  //     props.message.messageDispatch
  //   );
  // }, []);
  return (
    <React.Fragment>
      <div>Home</div>
    </React.Fragment>
  );
};

export default withContext(Home);
