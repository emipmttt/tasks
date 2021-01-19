import React, { useState, useEffect } from "react";
import firebase from "../../../../services/firebase";
import { getTask, createTask } from "../../../../services/queries";

import { setTask } from "../../../../store/actions/";

import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { connect } from "react-redux";

import CreateIcon from "../../../../assets/img/create.png";

const CreateTask = ({ user, setTask }) => {
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

    const task = {
      createdBy: user.uid,
      createdAt: Date.now(),
      description,
      duration: Number(duration),
      current: Number(duration),
    };

    try {
      setLoading(true);
      setMessage(await createTask(task));
      setLoading(false);
      setTask(await getTask(user.uid));
      setTimeout(() => {
        setMessage("");
      }, 2000);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-3">
        <strong>Crear una tarea</strong>
      </div>
      <Card>
        <Form
          className="mt-3 mr-3 ml-3"
          autoComplete="off"
          onSubmit={(e) => {
            createTaskHandler(e);
          }}
        >
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
  };
};

const mapDispatchToProps = {
  setTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);