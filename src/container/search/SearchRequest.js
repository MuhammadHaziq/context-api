import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/chatAction";
const useStyles = makeStyles(theme => ({
  root: {
    overflow: "Hidden",
    whiteSpace: "normal",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));
const SearchRequest = props => {
  const classes = useStyles();
  console.log(props);
  const getFriend = email => {
    ACTIONS.chat_open(email, props.chat.chatDispatch);
  };
  return (
    <React.Fragment>
      {props.search.search.map(item => (
        <List className={classes.root}>
          <ListItem
            alignItems="flex-start"
            button
            onClick={() =>
              getFriend({
                id: item.key,
                email: item.email
              })
            }
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.photoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={item.username}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {item.email}
                  </Typography>
                  {/*{" — I'll be in your neighborhood doing errands this…"}*/}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </React.Fragment>
  );
};

export default withContext(SearchRequest);
