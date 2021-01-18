import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Auth from "../views/Auth/Auth";
import Home from "../views/Home/Home";

const Router = () => (
  <HashRouter>
    <Route exact path="/" component={Auth}></Route>
    <Route exact path="/home" component={Home}></Route>
  </HashRouter>
);

export default Router;
