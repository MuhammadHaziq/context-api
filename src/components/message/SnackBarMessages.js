import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
// import PropTypes from "prop-types";
// import Slide from "@material-ui/core/Slide";
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/messageActions.js";
const SnackBarMessages = props => {
  const handleClose = () => {
    ACTIONS.closeSnackeBar(props.message.messageDispatch);
  };
  // const TransitionDown = props => {
  //   return <Slide {...props} direction="down" />;
  // };

  const [state] = useState({
    vertical: "top",
    horizontal: "center"
  });

  const { vertical, horizontal } = state;
  return (
    <React.Fragment>
      <Snackbar
        open={props.message.open}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.message.message}</span>}
      />
    </React.Fragment>
  );
};

// SnackBarMessages.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withContext(SnackBarMessages);
// TransitionComponent={TransitionDown}
