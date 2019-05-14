import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Slide from "@material-ui/core/Slide";
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/messageActions.js";
const SnackBarMessages = props => {
  const handleClose = () => {
    ACTIONS.closeSnackeBar(props.message.dispatch);
  };
  const TransitionDown = props => {
    return <Slide {...props} direction="down" />;
  };
  return (
    <React.Fragment>
      <Snackbar
        open={props.message.open}
        onClose={handleClose}
        TransitionComponent={TransitionDown}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.message.message}</span>}
      />
    </React.Fragment>
  );
};

SnackBarMessages.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withContext(SnackBarMessages);
