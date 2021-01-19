import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "../../../../../../services/firebase";
import { getTask, updateTask } from "../../../../../../services/queries";
import { setTask } from "../../../../../../store/actions";

import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";

import EditIcon from "../../../../../../assets/img/edit.png";
import TrashIcon from "../../../../../../assets/img/trash.png";
import TimerIcon from "../../../../../../assets/img/timer.png";
import SaveIcon from "../../../../../../assets/img/save.png";
import CloseIcon from "../../../../../../assets/img/close.png";

const TaskItem = ({ taskItem, setTask, user }) => {
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
      console.log(error);
      setMessage("Ha ocurrido un error");
    }
  };

  const updateTaskHandler = async (e) => {
    e.preventDefault();

    const task = {
      createdBy: user.uid,
      createdAt: Date.now(),
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
        <Card className="mt-2">
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
        <Card key={taskItem.id} className="mt-2 pl-3 pr-3 pb-3 pt-3">
          <Row>
            <Col sm={6}>{taskItem.description}</Col>
            <Col sm={2}>{taskItem.duration}m</Col>
            <Col sm={4}>
              <div className="d-flex align-items-center">
                <Button block className="mr-1">
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
                <Button onClick={trashItem} block>
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
