import React from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const Home = () => {
  const createTask = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand href="#home">Tareas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </div>
      </Navbar>

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
                <Form.Control type="text" placeholder="Descripción" />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="number" placeholder="Duración (s)" />
                <Form.Text className="text-muted"></Form.Text>
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

export default Home;
