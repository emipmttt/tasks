import React from "react";

import Layout from "../../components/Layout/Layout";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";

const Home = () => {
  return (
    <Layout>
      <CreateTask />
      <TaskList />
    </Layout>
  );
};

export default Home;
