import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../store/actions";

import Auth from "../views/Auth/Auth";
import Home from "../views/Home/Home";
import Week from "../views/Week/Week";
import Error404 from "../views/404";

const Router = ({ setUser, user }) => {
  useEffect(() => {
    const userStorage = localStorage.getItem("user_task");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Auth}></Route>
        {user && user.uid && (
          <Route exact path="/home" component={Home}></Route>
        )}
        {user && user.uid && (
          <Route exact path="/week" component={Week}></Route>
        )}
        <Route component={Error404}></Route>
      </Switch>
    </HashRouter>
  );
};

const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
