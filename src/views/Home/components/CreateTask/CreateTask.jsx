import React, { useState, useEffect } from "react";
import { getTask, createTask } from "../../../../services/queries";

import { setTask } from "../../../../store/actions/";

import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { connect } from "react-redux";

import CreateIcon from "../../../../assets/img/create.png";

const CreateTask = ({ user, setTask, taskList }) => {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (duration == "costum") {
      setShowInput(true);
    }
  }, [duration]);

  const createTaskHandler = async (e) => {
    e.preventDefault();

    if (duration == 0) {
      return setMessage("Completa todos los campos");
    }

    const task = {
      createdBy: user.uid,
      order: taskList.length,
      createdAt: Date.now(),
      description,
      duration: Number(duration) * 60,
      current: Number(duration) * 60,
      status: 0,
      finished: false,
    };

    try {
      setLoading(true);
      setMessage(await createTask(task));
      setLoading(false);
      setTask(await getTask(user.uid));
      setDuration(0);
      setDescription("");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="mt-3 pb-3">
        <Form
          className="mt-3 mr-3 ml-3"
          autoComplete="off"
          onSubmit={(e) => {
            createTaskHandler(e);
          }}
        >
          <div className="mb-3">
            <strong>Crear una tarea</strong>
          </div>
          <Row>
            <Col sm={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  required
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
                    required
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
                    required
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
              <Button type="submit" block>
                <img src={CreateIcon} />
              </Button>
            </Col>
          </Row>
          {message && (
            <Alert onClose={() => setMessage("")} dismissible variant="primary">
              {message}
            </Alert>
          )}
        </Form>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    taskList: state.taskList,
  };
};

const mapDispatchToProps = {
  setTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
