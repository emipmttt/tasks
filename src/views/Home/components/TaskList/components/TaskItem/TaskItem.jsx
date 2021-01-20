import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "../../../../../../services/firebase";

import secondToMinutes from "../../../../../../utils/secondsToMinutes";

import {
  getTask,
  updateTask,
  pauseMyTasks,
} from "../../../../../../services/queries";
import { setTask } from "../../../../../../store/actions";

import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";

import EditIcon from "../../../../../../assets/img/edit.png";
import TrashIcon from "../../../../../../assets/img/trash.png";
import TimerIcon from "../../../../../../assets/img/timer.png";
import SaveIcon from "../../../../../../assets/img/save.png";
import CloseIcon from "../../../../../../assets/img/close.png";
import UpIcon from "../../../../../../assets/img/up.png";
import DownIcon from "../../../../../../assets/img/down.png";

const TaskItem = ({ taskItem, setTask, user, next, back, tasks }) => {
  const [description, setDescription] = useState(taskItem.description);
  const [duration, setDuration] = useState(taskItem.duration);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [inEdit, setInEdit] = useState(false);

  useEffect(() => {
    if (duration == "costum") {
      setShowInput(true);
    }
  }, [duration]);

  const trashItem = async () => {
    try {
      await firebase.firestore().collection("task").doc(taskItem.id).delete();
      setTask(await getTask(user.uid)); 
    } catch (error) {
      setMessage("Ha ocurrido un error");
    }
  };

  const setDown = async () => {
    const currentOrder = taskItem.order;
    await updateTask(taskItem.id, {
      order: Number(next.order) + 1,
    });
    await updateTask(next.id, {
      order: Number(currentOrder) + 1,
    });
    setTask(await getTask(user.uid));
  };

  const setUp = async () => {
    const currentOrder = taskItem.order;
    await updateTask(taskItem.id, {
      order: Number(back.order) - 1,
    });
    await updateTask(back.id, {
      order: Number(currentOrder) - 1,
    });
    setTask(await getTask(user.uid));
  };

  const playTask = async () => {
    await pauseMyTasks(tasks.map((taskItem) => taskItem.id));
    await updateTask(taskItem.id, {
      status: 1,
    });
    setTask(await getTask(user.uid));
  };

  const updateTaskHandler = async (e) => {
    e.preventDefault();

    const task = {
      createdBy: user.uid,
      description,
      duration: Number(duration),
      current: Number(duration),
    };

    try {
      setLoading(true);
      setMessage(await updateTask(taskItem.id, task));
      setLoading(false);
      setTask(await getTask(user.uid));
      setTimeout(() => {
        setMessage("");
        setInEdit(false);
      }, 2000);
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      {inEdit && (
        <Card className="mt-2" border={taskItem.finished ? "primary" : null}>
          <Form
            className="mt-3 mr-3 ml-3"
            autoComplete="off"
            onSubmit={(e) => {
              updateTaskHandler(e);
            }}
          >
            <Row>
              <Col sm={6}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    placeholder="Descripción"
                    disabled={loading}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
              <Col sm={4}>
                {showInput && (
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                      type="number"
                      min="1"
                      max="120"
                      maxLength="3"
                      placeholder="Duración (minutos)"
                      disabled={loading}
                    ></Form.Control>
                  </Form.Group>
                )}
                {!showInput && (
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Control
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                      as="select"
                      placeholder="Duración"
                      disabled={loading}
                    >
                      <option value="0" disabled>
                        Duración
                      </option>
                      <option value="30">Corta (30 minutos)</option>
                      <option value="45">Media (45 minutos)</option>
                      <option value="60">Larga (60 minutos)</option>
                      <option value="costum">Personalizado</option>
                    </Form.Control>
                  </Form.Group>
                )}
              </Col>
              <Col sm={2}>
                <div className="d-flex align-items-center">
                  <Button className="mr-1" type="submit" block>
                    <img src={SaveIcon} />
                  </Button>
                  <br />
                  <Button
                    onClick={() => {
                      setInEdit(false);
                    }}
                    block
                  >
                    <img src={CloseIcon} />
                  </Button>
                </div>
              </Col>
            </Row>
            {message && (
              <Alert
                onClose={() => setMessage("")}
                dismissible
                variant="primary"
              >
                {message}
              </Alert>
            )}
          </Form>
        </Card>
      )}
      {!inEdit && (
        <Card
          key={taskItem.id}
          className="mt-2 pl-3 pr-3 pb-3 pt-3"
          border={taskItem.finished ? "primary" : null}
        >
          <Row>
            <Col xs={12} sm={3} md={5} lg={6}>
              <p>
                {taskItem.finished && (
                  <strong
                    className="text-primary "
                    style={{ fontSize: "12px" }}
                  >
                    Completado
                  </strong>
                )}
                <br />
                {taskItem.description}
              </p>{" "}
            </Col>
            <Col sm={2}>
              {secondToMinutes(taskItem.current).minutes}:
              {secondToMinutes(taskItem.current).seconds} <span> / </span>
              {secondToMinutes(taskItem.duration).minutes}:
              {secondToMinutes(taskItem.duration).seconds}
            </Col>
            <Col xs={12} sm={7} md={5} lg={4}>
              <div className="d-flex align-items-center">
                <Button onClick={playTask} block className="mr-1">
                  <img src={TimerIcon} />
                </Button>
                <br />
                <Button
                  onClick={() => {
                    setInEdit(true);
                  }}
                  block
                  className="mr-1"
                >
                  <img src={EditIcon} />
                </Button>
                <br />
                {back && (
                  <Button onClick={setUp} block className="mr-1">
                    <img src={UpIcon} />
                  </Button>
                )}
                <br />
                {next && (
                  <Button onClick={setDown} block className="mr-1">
                    <img src={DownIcon} />
                  </Button>
                )}
                <br />
                <Button onClick={trashItem} block variant="danger">
                  <img src={TrashIcon} />
                </Button>
              </div>
            </Col>
          </Row>
          {message && (
            <Alert onClose={() => setMessage("")} dismissible variant="primary">
              {message}
            </Alert>
          )}
        </Card>
      )}
    </>
  );
};

TaskItem.propTypes = {
  taskItem: PropTypes.object,
  next: PropTypes.object,
  back: PropTypes.object,
  tasks: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  setTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
