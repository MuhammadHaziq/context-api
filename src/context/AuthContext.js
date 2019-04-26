import React from "react";

const Intial_State = {
  auth: false
};
// const AuthContext = () => {
const AuthContext = React.createContext({ Intial_State });
// };

export default AuthContext;
