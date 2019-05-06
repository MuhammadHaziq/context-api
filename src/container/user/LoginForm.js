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
const LoginForm = props => {
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

  const Login = e => {
    e.preventDefault();
    props.context.dispatch(ACTIONS.Login());
  };

  useEffect(() => {
    document.body.style.background = "#bbdefb";
  }, []);
  return (
    // <AuthContext.Consumer>
    // {context => (
    <React.Fragment>
      <Grid container direction="column" justify="center" alignItems="center">
        <form className={classes.container} autoComplete="off" onSubmit={Login}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                />
              </CardActionArea>

              <CardContent>
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
                  <Button type="submit" size="small" color="primary">
                    Login
                  </Button>
                  <Button size="small" color="primary">
                    Sign Up
                  </Button>
                </Grid>
              </CardActions>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Typography
                  paragraph
                  className={classes.textLink}
                  color="primary"
                  // component={Link}
                  // to="/forgotpassword"
                >
                  Forget Password?
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
    // )}
    // </AuthContext.Consumer>
  );
};
LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withContext(LoginForm);
