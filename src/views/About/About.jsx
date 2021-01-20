import React from "react";
import Layout from "../../components/Layout/Layout";
const About = () => {
  return (
    <Layout>
      <h1>About</h1>

      <p>
        Esta prueba técnica para Arkon Data fue desarrollada
        <strong> con {"<3"}</strong> por Emiliano Pacheco
      </p>
      <p>Tecnologías utilizadas:</p>

      <ul>
        <li>React</li>
        <li>React Hooks</li>
        <li>Redux</li>
        <li>Firebase</li>
        <li>React Bootstrap</li>
        <li>Chart.js</li>
      </ul>
      <p>Enlaces de interés:</p>
      <ul>
        <li>
          <a target="_blank" href="https://github.com/emipmttt/tasks">
            Repositorio
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/emipmttt">
            Github
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://es.stackoverflow.com/users/86010/emiliano-pamont?tab=profile"
          >
            Stack Overflow
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.behance.net/emipmt">
            Behance
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/emipmt/">
            Linkedin
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.linkedin.com/in/emipmt/">
            Platzi
          </a>
        </li>
        <li>
          Correo Electrónico:{" "}
          <a target="_blank" href="mailto:emipmttt@gmail.com">
            emipmttt@gmail.com
          </a>
        </li>
      </ul>
    </Layout>
  );
};

export default About;
