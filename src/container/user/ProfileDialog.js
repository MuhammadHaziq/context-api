import React from "react";
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
function ProfileDialog(props) {
  const [state, setProfile] = React.useState({
    userName: "",
    phoneNumber: "",
    email: ""
  });
  //
  // function handleClickOpen() {
  //   setOpen(true);
  // }
  //
  // function handleClose() {
  //   setOpen(false);
  // }
  const handleOnChange = e => {
    const { name, value } = e.target;
    setProfile({ ...state, [name]: value });
  };

  const saveProfileData = e => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="flex-end" alignItems="center">
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
                handleOnChange={handleOnChange}
                name={"userName"}
              />
              <Input
                autoFocus
                id={"userEmail"}
                label={"User Email"}
                type={"email"}
                handleOnChange={handleOnChange}
                name={"userEmail"}
              />
              <Input
                autoFocus
                id={"phoneNumber"}
                label={"phone Number"}
                type={"number"}
                handleOnChange={handleOnChange}
                name={"phoneNumber"}
              />
              <Input
                autoFocus
                id={"userName"}
                label={"User Name"}
                type={"text"}
                handleOnChange={handleOnChange}
                name={"userName"}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={props.closeProfile} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </React.Fragment>
  );
}
ProfileDialog.propTypes = {
  closeProfile: PropTypes.func.isRequired,
  open: PropTypes.bool
};
export default ProfileDialog;
