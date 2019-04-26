import React from "react";
import MainLayout from "../components/MainLayout.js";
import LoginForm from "../container/user/LoginForm.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
const Routes = props => {
  const [state, setAuth] = React.useState({
    auth: false,
    userName: "",
    password: ""
  });
  const Login = e => {
    e.preventDefault();
    setAuth({ ...state, auth: true });
  };
  return (
    <AuthContext.Provider value={{ ...state, Login }}>
      <React.Fragment>
        <BrowserRouter>
          <MainLayout>
            <Route>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/login" />}
              />
              <Route exact path="/login" component={LoginForm} />
            </Route>
          </MainLayout>
        </BrowserRouter>
      </React.Fragment>
    </AuthContext.Provider>
  );
};

export default Routes;
