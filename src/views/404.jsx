// pantalla default
import React from "react";

export default () => (
  <div className="page-wrap d-flex flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12 text-center">
          <span className="display-1 d-block">Ups</span>
          <br />
          <div className="mb-4 lead">Este sitio no está disponible para ti</div>
          <a href="/" className="btn btn-link">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  </div>
);
