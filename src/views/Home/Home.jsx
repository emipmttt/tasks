import React from "react";

import { Button, Row, Col } from "react-bootstrap";

import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";

const Home = () => {
  return (
    <>
      <CreateTask />
      <TaskList />
    </>
  );
};

export default Home;
