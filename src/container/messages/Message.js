<<<<<<< HEAD
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
import Button from "@material-ui/core/Button";
import MessageInput from "../MessageInput.js";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  bottom: {},
  dense: {
    marginTop: 19
  },
  container: {
    minHeight: '100%'
  },
  // root: {
  //   flexGrow: 1,
  //   overflow: 'hidden',
  //   padding: theme.spacing(0, 3),
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: fade(theme.palette.common.white, 0.15),
  //   '&:hover': {
  //     backgroundColor: fade(theme.palette.common.white, 0.25)
  //   }
  // },
  root: {
    overflow: 'Hidden',
    whiteSpace: 'normal',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  },
  // root: {
  //   width: '100%',
  //   maxWidth: 360,
  //   backgroundColor: theme.palette.background.paper
  // },
  paper: {
    maxWidth: 'auto',
    // margin: `${theme.spacing(8)}px auto`,
    padding: theme.spacing(2)
  }
}))

const Message = props => {
  const classes = useStyles()
  const [state, setMessage] = useState({
    message: '',
    chats: [],
    friend_image: ''
  })

  useEffect(
    () => {
      setMessage({
        ...state,
        chats: props.chat.message,
        friend_image: props.chat.chat_data.friend_image
      })
    },
    [props.chat.message]
  )

  const handleOnChangeMessage = e => {
    const { name, value } = e.target
    setMessage({ ...state, [name]: value })
  }

  // const submit = e => {
  //   e.preventDefault();
  //   const dataa = {
  //     message: state.message,
  //     sender_id: props.context.user.id,
  //     Reciver_id: props.chat.chat_data.id
  //   };
  //   ACTIONS.send_message(dataa, props.chat.chatDispatch);
  //   console.log(data);
  // };

  // console.logprops;
  // console.log(props.chat.chat_data.id);
  // console.log(state.message);
  // console.log
  // (state.chats);
  return (
    <React.Fragment>
      <Paper style={{ maxHeight: 400, overflow: 'auto' }}>
        <Grid
          container
          direction='column'
          justify='flex-end'
          alignItems='flex-end'
          item
          xs={12}
          md={12}
          lg={12}
        >
          {state.chats.map((item, index) => (
            <Grid item xs={12} md={12} lg={12}>
              <List className={classes.root}>
                <ListItem
                  alignItems='flex-center'
                  key={index}
                  style={{ marginRight: '15px' }}
                >
                  <ListItemText
                    primary={item.message}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body3'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          hhhh
                          {/* {item.email} */}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ListItemAvatar>
                    <Avatar
                      alt='Remy Sharp'
                      src={item.image ? item.image : '/images/profileImage.png'}
                    />
                  </ListItemAvatar>
                </ListItem>
              </List>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <MessageInput />
    </React.Fragment>
  )
}
export default withContext(Message)
// <Paper className={classes.paper} alignItems="flex-start">
//   <Grid container wrap="nowrap" spacing={2}>
//     <Grid item>
//       <Avatar>W</Avatar>
//     </Grid>
//   </Grid>// </Paper>
