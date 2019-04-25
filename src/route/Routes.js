import React from "react";
import MainLayout from "../components/MainLayout.js";
import LoginForm from "../container/user/LoginForm.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";
const Routes = props => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <AuthContext.Provider>
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
        </AuthContext.Provider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
