import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import * as ACTIONS from "../actions/chatAction";
import withContext from "../context/ContextHOC.js";
const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: "67%",
    bottom: 10
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    // padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const MessageInput = props => {
  const classes = useStyles();
  const [state, setValues] = useState({
    message: ""
  });
  const handleChange = name => e => {
    const { name, value } = e.target;
    setValues({ ...state, [name]: value });
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    const data = {
      message: state.message,
      sender_id: props.context.user.id,
      Reciver_id: props.chat.chat_data.friend_id
    };
    ACTIONS.send_message(
      data,
      props.chat.chatDispatch,
      props.message.messageDispatch
    );
    setValues({ ...state, message: "" });
    console.log(state);
  };
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <InputBase
          fullWidth
          className={classes.input}
          placeholder="Type Message"
          name="message"
          value={state.message}
          multiline
          rowsMax="30"
          onChange={handleChange()}
        />
        <IconButton
          onClick={handleOnSubmit}
          className={classes.iconButton}
          aria-label="Message"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </IconButton>
      </Paper>
    </React.Fragment>
  );
};

export default withContext(MessageInput);
// autoComplete="email"
// <Button
//   type="button"
//   size="small"
//   color="primary"
//   onClick={handleOnSubmit}
// >
//   <Icon className={classes.rightIcon}>send</Icon>
// </Button>

//  <Max length
// inputProps={{
//   maxLength: 10
// }}
