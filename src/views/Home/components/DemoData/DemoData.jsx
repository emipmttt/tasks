// componente para generar data aleatoria
// para probar la herramient
import React from "react";
import { connect } from "react-redux";

import firebase from "../../../../services/firebase";

import randomNumber from "../../../../utils/randomNumber";
import { setTask } from "../../../../store/actions";
import { getTask, createTask } from "../../../../services/queries";

import { Button } from "react-bootstrap";

const DemoData = ({ user, taskList, setTask }) => {
  const createDemoData = async () => {
    const generateDemoData = async (index) => {
      // obtener el rango de tiempo (los
      // los últimos siete días)
      let initialDate = new Date();
      initialDate.setDate(initialDate.getDate() - 7);
      initialDate = initialDate.getTime();
      let finalDate = Date.now();

      // fecha aleatoria entre hace siete días y hoy
      const randomDay = new Date(randomNumber(initialDate, finalDate));

      // duración aleatoria
      const duration = randomNumber(0, 120 * 60);

      // generar descripciones automaticas
      // solicitando texto aleatorio desde una api
      // si la api falla simplemente añade tarea de prueba
      var description;

      try {
        description = (
          await (
            await fetch("http://www.randomtext.me/api/lorem/p-1/7-30")
          ).json()
        ).text_out.replace(/(<p>|<\/p>)/g, "");
      } catch (error) {
        description = "Tarea de prueba";
      }

      // tarea con todos los datos

      const task = {
        createdBy: user.uid,
        order: index,
        createdAt: Date.now(),
        description,
        duration,
        current: Math.round(randomNumber(duration * 0.8, duration)),
        status: 0,
        finished: true,
        finishedAt: randomDay.getTime(),
      };

      return task;
    };

    // añadiendo 50 datos de prueba

    const db = firebase.firestore();

    var batch = db.batch();
    for (var i = 0; i < 50; i++) {
      let newTask = db.collection("task").doc();
      batch.set(newTask, await generateDemoData(i));
    }

    await batch.commit();
    setTask(await getTask(user.uid));
  };

  return (
    <div className="text-center">
      <Button onClick={createDemoData}>Crear datos de prueba</Button>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DemoData);
