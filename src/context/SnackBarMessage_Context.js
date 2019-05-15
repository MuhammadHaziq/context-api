import React from "react";
// INITIAL_STATE is optional in the createContext if you not pass it than there is no problem in code
const Intial_State = {
  open: false,
  message: ""
};
const SnackbarContext = React.createContext({ Intial_State });

export default SnackbarContext;
