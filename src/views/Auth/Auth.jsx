// pantalla de autenticación

import React, { useState } from "react";
import firebase from "../../services/firebase";

import { connect } from "react-redux";
import { setUser } from "../../store/actions";
import { Link, useHistory } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

const Auth = ({ setUser }) => {
  const history = useHistory();
  const [message, setMessage] = useState();

  const googleAuth = async () => {
    // atenticando a través de firebase
    // con el proveedor de google
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = "es";

    try {
      const authQuery = await firebase.auth().signInWithPopup(provider);

      // si el usuario se pudo autenticar correctamente
      // lo almacenamos en el localStorage y también
      // en el stado
      setUser(authQuery.user);
      localStorage.setItem(
        "user_task",
        JSON.stringify({
          ...authQuery.user.providerData[0],
          uid: authQuery.user.uid,
        })
      );
      // redireccionar al home
      history.push("/home");
    } catch (error) {
      // setear el error si ocurre para
      // renderizar en html
      setMessage(`${error.code} | ${error.message} `);
    }
  };

  return (
    <>
      <div className="container justify">
        <div
          className="d-flex align-items-center "
          style={{ minHeight: "100vh" }}
        >
          <div className="">
            <h1>Tareas</h1>
            <p>
              Gestiona tu lista de cosas por hacer, administra su orden,
              <br />
              cronometra la duración de tus actividades, obtén reportes <br />
              semanales, persiste tus datos creando tu cuenta con google <br />
            </p>
            <p>Prueba Técnica para Arkon Data</p>
            <p>
              <Link to="/about">Acerca de este proyecto</Link>
            </p>

            <Button onClick={googleAuth}>Acceder con google</Button>
            <br />
            <br />
            {message && (
              <Alert
                onClose={() => setMessage("")}
                dismissible
                variant="primary"
              >
                {message}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// consumiendo store

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Auth);
