import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import withContext from "../../context/ContextHOC.js";

const SnackBarMessages = props => {
  handleClose = () => {
    ACTIONS.closeSnackeBar(props.context.dispatch);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={props.context.state.open}
        onClose={this.handleClose}
        TransitionComponent={TransitionDown}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.context.state.message}</span>}
      />
    </React.Fragment>
  );
};

SnackBarMessages.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withContext(SnackBarMessages);
