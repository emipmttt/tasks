import React, { useState, useEffect } from "react";
import { getTask } from "../../../../services/queries";

import { connect } from "react-redux";
import { setTask } from "../../../../store/actions";

import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";

import TaskItem from "./components/TaskItem/TaskItem";

const TaskList = ({ setTask, taskList, user }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = async () => {
      setTask(await getTask(user.uid));
    };

    query();
  }, []);

  return (
    <>
      {message && (
        <Alert onClose={() => setMessage("")} dismissible variant="primary">
          {message}
        </Alert>
      )}
      {taskList.map((taskItem, index) => (
        <div key={taskItem.id}>
          {/* <pre>{JSON.stringify(taskList[index + 1])}</pre> */}
          <TaskItem
            taskItem={taskItem}
            next={taskList[index + 1] ? taskList[index + 1] : null}
            back={index - 1 >= 0 ? taskList[index - 1] : null}
          />
        </div>
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    taskList: state.taskList,
    user: state.user,
  };
};

const mapDispatchToProps = {
  setTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
