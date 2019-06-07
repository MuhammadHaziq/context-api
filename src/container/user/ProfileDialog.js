import React, { useEffect } from "react";
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
function ProfileDialog(props) {
  const [state, setProfile] = React.useState({
    userName: "",
    phoneNumber: "",
    userEmail: ""
  });
  const [date, setDate] = React.useState({
    dateofbirth: new Date()
  });
  const handleOnChange = e => {
    const { name, value } = e.target;
    setProfile({ ...state, [name]: value });
  };
  const handleDateChange = dateofbirth => {
    setDate({ ...state, dateofbirth: dateofbirth });
  };
  const saveProfileData = e => {
    e.preventDefault();
    const data = {
      name: state.userName,
      phoneNumber: state.phoneNumber,
      email: state.userEmail,
      dateofbirth: date.dateofbirth
    };
    console.log(data);

    ACTIONS.updateProfile(
      data,
      props.context.dispatch,
      props.message.messageDispatch
    );
  };
  useEffect(() => {
    if (state.userEmail == "") {
      setProfile({
        ...state,
        userEmail: props.context.user.email,
        userName: props.context.user.displayName
      });
    }
  });
  console.log(props);
  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={props.closeProfile}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Your Profile</DialogTitle>
        <form onSubmit={saveProfileData}>
          <DialogContent>
            <Input
              autoFocus
              id={"userName"}
              label={"User Name"}
              type={"text"}
              value={state.userName}
              handleOnChange={handleOnChange}
              name={"userName"}
            />
            <Input
              id={"userEmail"}
              label={"User Email"}
              type={"email"}
              value={state.userEmail}
              handleOnChange={handleOnChange}
              name={"userEmail"}
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
}
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
