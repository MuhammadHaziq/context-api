import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Input from "../../components/inputs/Input.js";
import Date_Picker from "../../components/datePicker/Date_Picker.js";
import * as ACTIONS from "../../actions/authActions.js";
import withContext from "../../context/ContextHOC.js";
import dateFormat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  input: {
    display: "none"
  }
});
const ProfileDialog = props => {
  const classes = useStyles();

  const [state, setProfile] = React.useState({
    userName: "",
    phoneNumber: "",
    userEmail: ""
  });
  const [date, setDate] = React.useState({
    dateofbirth: new Date()
  });
  const [image, setImage] = React.useState({
    image: ""
  });
  const handleOnChange = e => {
    const { name, value } = e.target;
    setProfile({ ...state, ...date, ...image, [name]: value });
  };
  const handleDateChange = dateofbirth => {
    setDate({ ...state, ...image, dateofbirth: dateofbirth });
  };
  const handleOnChangeImage = file => {
    console.log(file.target.files[0]);
    if (!file.target.files[0]) {
      return false;
    } else {
      const reader = new FileReader();
      const url = reader.readAsDataURL(file.target.files[0]);
      // Call Back Function Execute after read file data
      reader.onloadend = e => {
        console.log(reader.result);
        setImage({ ...state, ...date, image: reader.result });
      };
    }
  };
  const saveProfileData = e => {
    e.preventDefault();
    const data = {
      name: state.userName,
      phoneNumber: state.phoneNumber,
      email: state.userEmail,
      dateofbirth: dateFormat(date.dateofbirth, "dd-mm-yyyy"),
      image: image.image
    };
    console.log(data);

    ACTIONS.updateProfile(
      data,
      props.context.dispatch,
      props.message.messageDispatch
    );
  };
  useEffect(() => {
    const data = {
      id: props.context.user.id
    };
    ACTIONS.get_User_Current_Detail(
      data,
      props.context.dispatch,
      props.message.messageDispatch
    );
  }, []);

  useEffect(
    () => {
      setProfile({
        ...state,
        userEmail: props.context.user.email,
        userName: props.context.userDetail.username,
        phoneNumber: props.context.userDetail.phoneNumber
      });

      setImage({
        image: props.context.userDetail.photoUrl
      });
      setDate({
        dateofbirth: props.context.userDetail.dateofbirth
      });
      // }
    },
    [props.context.userDetail.email]
  );

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        fullWidth={true}
        onClose={props.closeProfile}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Your Profile</DialogTitle>
        <form onSubmit={saveProfileData}>
          <DialogContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                name="image"
                onChange={handleOnChangeImage}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  className={classes.button}
                  aria-label="Upload picture"
                  component="span"
                >
                  <Avatar
                    className={classes.avatar}
                    src={image.image ? image.image : "/images/profileImage.png"}
                  />
                </IconButton>
              </label>
            </Grid>

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="stretch"
            >
              <Input
                autoFocus
                id={"userName"}
                label={"User Name"}
                type={"text"}
                value={state.userName}
                handleOnChange={handleOnChange}
                name={"userName"}
                isRequired
              />
              <Input
                id={"userEmail"}
                label={"User Email"}
                type={"email"}
                value={state.userEmail}
                handleOnChange={handleOnChange}
                name={"userEmail"}
                disabled
              />
              <Input
                autoFocus
                id={"phoneNumber"}
                label={"phone Number"}
                type={"number"}
                value={state.phoneNumber}
                handleOnChange={handleOnChange}
                name={"phoneNumber"}
              />
              <Date_Picker
                label={"Date Of Birth"}
                selectedDate={date.dateofbirth}
                handleDateChange={handleDateChange}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.closeProfile} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
ProfileDialog.propTypes = {
  closeProfile: PropTypes.func.isRequired,
  open: PropTypes.bool
};
export default withContext(ProfileDialog);

// <Input
//   autoFocus
//   id={"userName"}
//   label={"User Name"}
//   type={"text"}
//   handleOnChange={handleOnChange}
//   name={"userName"}
// />
