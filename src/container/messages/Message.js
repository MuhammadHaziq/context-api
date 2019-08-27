import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, fade } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/chatAction";
import { FixedSizeList } from "react-window";
const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 19
  },
  container: {
    minHeight: "100%"
  },
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  paper: {
    maxWidth: "auto",
    // margin: `${theme.spacing(8)}px auto`,
    padding: theme.spacing(2)
  }
}));

const Message = props => {
  const classes = useStyles();
  const [state, setMessage] = useState({
    message: ""
  });

  const handleOnChangeMessage = e => {
    const { name, value } = e.target;
    setMessage({ ...state, [name]: value });
  };

  const submit = e => {
    e.preventDefault();
    const data = {
      message: state.message
    };
    console.log(data);
  };
  console.log(props);
  console.log(state.message);
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="flex-end"
      >
        <Grid item xs>
          <List className={classes.root}>
            <ListItem alignItems="flex-start" button>
              <ListItemText primary="hello" className={classes.root} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <TextField
        fullWidth
        id="standard-Message-input"
        label="Message"
        className={classes.textField}
        type="text"
        margin="normal"
        name="message"
        onChange={handleOnChangeMessage}
      />
    </React.Fragment>
  );
};
export default withContext(Message);
// <Paper className={classes.paper} alignItems="flex-start">
//   <Grid container wrap="nowrap" spacing={2}>
//     <Grid item>
//       <Avatar>W</Avatar>
//     </Grid>
//   </Grid>// </Paper>
