import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 10
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

const MessageInput = props => {
  const classes = useStyles();
  const [state, setValues] = useState({
    message: ""
  });
  const handleChange = name => event => {
    setValues({ [name]: event.target.value });
  };
  const handleOnSubmit = e => {
    e.preventDefault();
    const data = {
      message: state.message
    };
    console.log(state);
  };
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <InputBase
          fullWidth
          className={classes.input}
          placeholder="Message"
          type={"text"}
          name={"message"}
          value={state.message}
          onChange={handleChange}
        />
        <IconButton
          className={classes.iconButton}
          onClick={handleOnSubmit}
          aria-label="Message"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </React.Fragment>
  );
};

export default MessageInput;
// autoComplete="email"
// <Button
//   type="button"
//   size="small"
//   color="primary"
//   onClick={handleOnSubmit}
// >
//   <Icon className={classes.rightIcon}>send</Icon>
// </Button>
