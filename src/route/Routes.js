import React from "react";
import MainLayout from "../components/MainLayout.js";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

const Routes = props => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <MainLayout>
          <Route>
            <Route
              path="/"
              component={() => <Redirect to=<div>Hello</div> />}
            />
          </Route>
        </MainLayout>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default Routes;
