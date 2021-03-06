import React, { useState, useEffect, useContext } from "react";
import Input from "../../components/inputs/Input.js";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import withContext from "../../context/ContextHOC.js";
import * as ACTIONS from "../../actions/authActions";
import firebase from "../../firebase/Firebase.js";
import { SIGNUP_SUCCESS, SIGNUP_FAIL } from "../../actions/allActionTypes.js";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 50
  },
  card: {
    maxWidth: 300,
    borderRadius: 10
  },
  media: {
    objectFit: "cover",
    height: "190px"
  }
}));
const SignUpForm = props => {
  const classes = useStyles();
  // const context = useContext(AuthContext);
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const handleOnChange = name => e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const Signup = async e => {
    e.preventDefault();
    // try {
    //   const res = await firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(values.email, values.password)
    //     .then(response => {
    //       return { status: true, response: response.message };
    //       // console.log(response);
    //     })
    //     .catch(error => {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       return { status: false, response: error.message };
    //
    //       // ...
    //     });
    //   if (res.status == true) {
    //     props.context.dispatch({ type: SIGNUP_SUCCESS });
    //   } else {
    //     props.context.dispatch({ type: SIGNUP_FAIL });
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
  };

  useEffect(() => {
    document.body.style.background = "#bbdefb";
  }, []);
  return (
    // <AuthContext.Consumer>
    // {context => (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <form
          className={classes.container}
          autoComplete="off"
          onSubmit={Signup}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/images/login.png"
                title="Contemplative Reptile"
              />

              <CardContent>
                <Typography
                  variant="h6"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Sign Up
                </Typography>
                <Input
                  id="outlined-email-input"
                  name={"email"}
                  type={"email"}
                  label={"Email"}
                  handleOnChange={handleOnChange()}
                />
                <Input
                  id="outlined-password-input"
                  name={"password"}
                  type={"password"}
                  label={"Password"}
                  handleOnChange={handleOnChange()}
                />
              </CardContent>
              <CardActions>
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    type="button"
                    size="small"
                    color="primary"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button type="submit" size="small" color="primary">
                    Sign Up
                  </Button>
                </Grid>
              </CardActions>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              />
            </Card>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
    // )}
    // </AuthContext.Consumer>
  );
};
SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withContext(SignUpForm);
