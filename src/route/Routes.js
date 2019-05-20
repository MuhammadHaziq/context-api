import React from "react";
import MainLayout from "../components/MainLayout.js";
import LoginForm from "../container/user/LoginForm.js";
import SignUpForm from "../container/user/SignUpForm.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import StoreContext from "../context/StoreContext.js";
import Home from "../container/Home.js";
import RequireAuth from "../utile/RequireAuth.js";

const Routes = props => {
  return (
    <StoreContext>
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
              <Route exact path="/Signup" component={SignUpForm} />
              <Route exact path="/home" component={RequireAuth(Home)} />
            </Route>
          </MainLayout>
        </BrowserRouter>
      </React.Fragment>
    </StoreContext>
  );
};

export default Routes;
