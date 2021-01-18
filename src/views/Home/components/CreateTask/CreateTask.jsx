import React, { useState } from "react";
import firebase from "../../../../services/firebase";

import { Form, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

const CreateTask = ({ user }) => {
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const createTask = (e) => {
    e.preventDefault();

    const task = {
      createdBy: user,
      description,
      duration,
    };

    // firebase.firestore().collection("task").add({});

    console.log(task);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="mb-3">
          <strong>Crear una tarea</strong>
        </div>
        <Form
          onSubmit={(e) => {
            createTask(e);
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
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                  as="select"
                  placeholder="Duración"
                >
                  <option value="0" disabled>
                    Duración
                  </option>
                  <option value="30">Corta</option>
                  <option value="45">Media</option>
                  <option value="60">Larga</option>
                  <option value="costum">Personalizado</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Button type="submit" block>
                Crear
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(CreateTask);
