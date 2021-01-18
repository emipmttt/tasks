import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Auth from "../views/Auth/Auth";

const Router = () => (
  <BrowserRouter>
    <Route exact path="/" component={Auth}></Route>
  </BrowserRouter>
);

export default Router;
