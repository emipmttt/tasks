import React, { useEffect } from "react";

import firebase from "../../services/firebase";

import { Button } from "react-bootstrap";

export default () => {
  const googleAuth = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().languageCode = "es";

    try {
      const authQuery = await firebase.auth().signInWithPopup(provider);
      console.log(authQuery.user);
    } catch (error) {
      alert(`${error.code}, ${error.message}`);
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
              semanales, persiste tus datos creando tu cuenta de google <br />
            </p>
            <p>Prueba Técnica para Arkon Data</p>

            <Button onClick={googleAuth}>Acceder con google</Button>
          </div>
        </div>
      </div>
    </>
  );
};