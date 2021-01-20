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
    // validar si se selecciona la opción
    // "costum" para en vez de mostrar un select
    // con las duraciones predeterminadas
    // se pueda escribir manualmente una
    if (duration == "costum") {
      setShowInput(true);
    }
  }, [duration]);

  const createTaskHandler = async (e) => {
    // funcion para crear una tarea
    e.preventDefault();

    // validar que la duración no sea igual a 0
    if (duration == 0) {
      return setMessage("Completa todos los campos");
    }

    // task es el modelo de una tarea

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
      // enviando la tarea

      // informando que el sistema está cargando
      // así los inputs y buttons se ponen disabled
      setLoading(true);
      // creando tarea, retornando y mostrando el mensaje
      setMessage(await createTask(task));
      // terminando de cargar
      setLoading(false);
      // recargando las tareas
      setTask(await getTask(user.uid));
      // volviendo a los valores, predeterminados
      setDuration(0);
      setDescription("");
      setShowInput(false);
      // borrando mensaje en dos segundos
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
              {/* input de descripción */}
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
              {/* input de duración, validando si se decidió
              usar el select o escribir el número de minutos */}
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
              {/* botón para crear la tarea */}

              <Button type="submit" block>
                <img src={CreateIcon} />
              </Button>
            </Col>
          </Row>
          {/* alert para mostrar avisos */}
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
