import React, { useEffect } from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../store/actions";

import Layout from "../components/Layout/Layout";

import Auth from "../views/Auth/Auth";
import Home from "../views/Home/Home";

const Router = ({ setUser, user }) => {
  useEffect(() => {
    const userStorage = localStorage.getItem("user_task");
    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }
  }, []);

  return (
    <HashRouter>
      <Route exact path="/" component={Auth}></Route>
      {user && user.uid && (
        <Layout>
          <Route exact path="/home" component={Home}></Route>
        </Layout>
      )}
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
