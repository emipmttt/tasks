import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";

import { setUser } from "../../store/actions";
import { connect } from "react-redux";

import "./Layout.scss";

const Layout = ({ children, user }) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand href="#home">Tareas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#/home">Inicio</Nav.Link>
              <Nav.Link href="#/week">Semana</Nav.Link>
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
          </Navbar.Collapse>
        </div>
      </Navbar>
      <div className="container mt-4">
        <div className="d-flex align-items-center">
          <Image className="profile-image" src={user.photoURL} roundedCircle />
          <div className="ml-4">{user.displayName}</div>
        </div>
      </div>
      <div className="container mt-4">{children}</div>
    </>
  );
};

const mapDispatchToProps = {
  setUser,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
