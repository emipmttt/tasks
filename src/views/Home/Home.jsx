// pantalla de home
import React from "react";

import Layout from "../../components/Layout/Layout";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";
import DemoData from "./components/DemoData/DemoData";

const Home = () => {
  return (
    <Layout>
      <CreateTask />
      <TaskList />
      <DemoData />
    </Layout>
  );
};

export default Home;
