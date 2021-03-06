import React from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

const Input = props => {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   name: "Cat in the Hat",
  //   age: "",
  //   multiline: "Controlled",
  //   currency: "EUR"
  // });

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };
  return (
    <TextField
      id={props.id}
      label={props.label}
      className={classes.textField}
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.handleOnChange}
      margin="normal"
      variant="outlined"
    />
  );
};

export default Input;
// autoComplete="email"
