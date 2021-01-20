import React, { useState, useEffect } from "react";
import { getTask } from "../../../../services/queries";

import { connect } from "react-redux";
import { setTask } from "../../../../store/actions";

import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  Card,
  ButtonGroup,
} from "react-bootstrap";

import TaskItem from "./components/TaskItem/TaskItem";
import CurrentTask from "./components/CurrentTask/CurrentTask";

const TaskList = ({ setTask, taskList, user }) => {
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState(0);
  const [duration, setDuration] = useState(0);
  const [taskListFiltered, setTaskListFiltered] = useState(taskList);

  useEffect(() => {
    const query = async () => {
      const tasksQuery = await getTask(user.uid);
      setTask(tasksQuery);
      setTaskListFiltered(tasksQuery);
    };
    query();
  }, []);

  useEffect(() => {
    setTaskListFiltered((state) => {
      switch (filter) {
        case 1:
          return taskList.filter((taskItem) => taskItem.finished);

        case 2:
          return taskList.filter((taskItem) => !taskItem.finished);

        default:
          return taskList;
      }
    });
    setTaskListFiltered((state) => {
      switch (duration) {
        case 1:
          console.log(state);
          return state.filter((taskItem) => {
            console.log(taskItem);
            return taskItem.duration < 30 * 60;
          });

        case 2:
          return state.filter(
            (taskItem) =>
              taskItem.duration > 30 * 60 && taskItem.duration < 60 * 60
          );

        case 3:
          return state.filter((taskItem) => taskItem.duration > 60 * 60);

        default:
          console.log(state);

          return state;
      }
    });
  }, [filter, duration]);

  return (
    <>
      {message && (
        <Alert onClose={() => setMessage("")} dismissible variant="primary">
          {message}
        </Alert>
      )}
      {taskList.find((taskItem) => taskItem.status) && <CurrentTask />}
      <Row>
        <Col>
          <section className=" mt-2">
            <span className="mr-2">Filtros:</span>
            <br />
            <ButtonGroup aria-label="Basic example">
              <Button
                variant={filter == 0 ? "primary" : null}
                onClick={() => {
                  setFilter(0);
                }}
              >
                Todas
              </Button>
              <Button
                variant={filter == 1 ? "primary" : null}
                onClick={() => {
                  setFilter(1);
                }}
              >
                Completadas
              </Button>
              <Button
                variant={filter == 2 ? "primary" : null}
                onClick={() => {
                  setFilter(2);
                }}
              >
                Incompletas
              </Button>
            </ButtonGroup>
          </section>
        </Col>
        <Col>
          <section className=" mt-2">
            <span className="mr-2">Duración:</span>
            <br />
            <ButtonGroup aria-label="Basic example">
              <Button
                variant={duration == 0 ? "primary" : null}
                onClick={() => {
                  setDuration(0);
                }}
              >
                Todas
              </Button>{" "}
              <Button
                variant={duration == 1 ? "primary" : null}
                onClick={() => {
                  setDuration(1);
                }}
              >
                {"< 30m"}
              </Button>
              <Button
                variant={duration == 2 ? "primary" : null}
                onClick={() => {
                  setDuration(2);
                }}
              >
                {"30m - 60m"}
              </Button>
              <Button
                variant={duration == 3 ? "primary" : null}
                onClick={() => {
                  setDuration(3);
                }}
              >
                {"> 60m"}
              </Button>
            </ButtonGroup>
          </section>
        </Col>
      </Row>
      {taskListFiltered
        .filter((taskItem) => !taskItem.status)
        .map((taskItem, index) => (
          <div key={taskItem.id}>
            <TaskItem
              taskItem={taskItem}
              tasks={taskList}
              next={taskList[index + 1] ? taskList[index + 1] : null}
              back={index - 1 >= 0 ? taskList[index - 1] : null}
            />
          </div>
        ))}
      <br />
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
