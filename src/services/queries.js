import firebase from "./firebase";

export const getTask = async (uid) => {
  const taskResult = await firebase
    .firestore()
    .collection("task")
    .where("createdBy", "==", uid)
    .orderBy("order", "desc")
    .get();

  var taskArr = [];

  taskResult.forEach((taskItem) => {
    taskArr.push({ id: taskItem.id, ...taskItem.data() });
  });

  return taskArr;
};

export const createTask = async (task) => {
  const createTask = await firebase.firestore().collection("task").add(task);

  if (createTask.id) {
    return "Creado correctamente";
  } else {
    return "Ha ocurrido un error";
  }
};

export const updateTask = async (id, task) => {
  const updateTask = await firebase
    .firestore()
    .collection("task")
    .doc(id)
    .update(task);

  return "Actualizado correctamente";
};
