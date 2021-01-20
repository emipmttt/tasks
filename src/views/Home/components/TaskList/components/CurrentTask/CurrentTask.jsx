import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTask } from "../../../../../../store/actions";
import { updateTask, getTask } from "../../../../../../services/queries";

import { Form, Button, Row, Col, Card } from "react-bootstrap";

import DoneIcon from "../../../../../../assets/img/done.png";
import PauseIcon from "../../../../../../assets/img/pause.png";
import PlayIcon from "../../../../../../assets/img/play.png";
import RestoreIcon from "../../../../../../assets/img/restore.png";

import secondToMinutes from "../../../../../../utils/secondsToMinutes";

const CurrentTask = ({ taskList, setTask, user }) => {
  const [currentTask, setCurrentTask] = useState({});
  const [intervalState, setIntervalState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // encontrar la tarea que actualmente se reproduce
    // el timer
    const findItem = taskList.find((taskItem) => taskItem.status);
    if (findItem && findItem.id) {
      setCurrentTask(findItem);
      playTask();
    }
  }, [taskList]);

  // pausar el temporizador
  const pauseTask = async () => {
    setLoading(true);
    clearInterval(intervalState);
    setIntervalState(null);
    // setCurrentTask({ ...currentTask, status: 0 });
    await updateTask(currentTask.id, {
      current: currentTask.current,
      status: 0,
    });
    setTask(await getTask(user.uid));
    setLoading(false);
  };

  // reiniciar el temporizador

  const restoreTimer = async () => {
    setLoading(true);

    await pauseTask();
    await updateTask(currentTask.id, { current: currentTask.duration });
    setTask(await getTask(user.uid));
    setLoading(false);
  };

  // Reproducir temporizador

  const playTask = () => {
    setIntervalState(() =>
      setInterval(() => {
        setCurrentTask((state) => {
          const newCurrent = state.current - 1;

          if (newCurrent <= 0) {
            return (async () => {
              await updateTask(state.id, {
                finished: true,
                finishedAt: Date.now(),
                status: 0,
                current: 0,
              });
              setTask(await getTask(user.uid));
            })();
          }

          return {
            ...state,
            current: newCurrent,
          };
        });
      }, 1000)
    );

    const updateCounter = () => {
      setCurrentTask((state) => {
        updateTask(state.id, {
          current: state.current,
        });
        return state;
      });

      setTimeout(() => {
        setIntervalState((state) => {
          if (state) {
            updateCounter();
          }
          return state;
        });
      }, 7000);
    };
    updateCounter();
  };

  // marcar tarea como finalizada

  const finishTask = async () => {
    await updateTask(currentTask.id, {
      finished: true,
      finishedAt: Date.now(),
    });
    await pauseTask();
    setTask(await getTask(user.uid));
  };

  return (
    <>
      {currentTask && (
        <Card className="mt-2 pb-3" bg="primary">
          <Form
            className="mt-3 mr-3 ml-3"
            autoComplete="off"
            onSubmit={(e) => {
              // updateTaskHandler(e);
            }}
          >
            <Row>
              <Col sm={6} className="text-white">
                {currentTask.description}
              </Col>
              <Col sm={2} className="text-white">
                {secondToMinutes(currentTask.current).minutes}:
                {secondToMinutes(currentTask.current).seconds} m
              </Col>
              <Col sm={4}>
                <div className="d-flex">
                  {/* botón para pausar */}
                  {currentTask.status && (
                    <Button
                      onClick={pauseTask}
                      block
                      className="mr-1"
                      disabled={loading}
                    >
                      <img src={PauseIcon} />
                    </Button>
                  )}
                  {/* botón para reproducir */}
                  {!currentTask.status && (
                    <Button
                      onClick={playTask}
                      block
                      className="mr-1"
                      disabled={loading}
                    >
                      <img src={PlayIcon} />
                    </Button>
                  )}

                  <br />
                  {/* botón para reiniciar el timer */}
                  <Button
                    onClick={restoreTimer}
                    block
                    className="mr-1"
                    disabled={loading}
                  >
                    <img src={RestoreIcon} />
                  </Button>
                  <br />
                  {/* botón para marcar como completada la tarea */}

                  <Button
                    onClick={finishTask}
                    block
                    className="mr-1"
                    disabled={loading}
                  >
                    <img src={DoneIcon} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTask);
