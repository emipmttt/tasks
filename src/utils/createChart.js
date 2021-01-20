import Chart from "chart.js";
import numberDayToText from "../utils/numberDayToText";

// este método construye los datos para encajarlos
// en una grafica de chart.js

export default (taskList) => {
  // filtra todas las tareas, para unicamente obtener
  // las tareas de los últimos 7 días

  const lastWeek = taskList.filter((taskItem) => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    const sevenDays = date.getTime();
    return taskItem.finishedAt >= sevenDays;
  });

  // inicializando variables

  var labels = [];
  var data = [];
  var backgroundColor = [];
  var borderColor = [];
  var preData = {};

  // añadiendo cuantas tareas hay cada día

  lastWeek.forEach((taskItem) => {
    const date = new Date(taskItem.finishedAt);
    const dayNumber = date.getDay();

    preData[dayNumber] = preData[dayNumber] ? preData[dayNumber] + 1 : 1;
  });

  var arrData = Object.keys(preData);

  // ordenando las tareas,por su día de la semana

  arrData = arrData.sort(
    (a, b) => preData[b].finishedAt - preData[a].finishedAt
  );

  //  añadir los datos listos a el array final
  // con la estructura correcta para crear el
  // grafico

  arrData.forEach((key) => {
    labels.push(numberDayToText(key));
    data.push(preData[key]);
    backgroundColor.push("rgba(54, 162, 235, 0.2)");
    backgroundColor.push("rgba(54, 162, 235, 0.2)");
  });

  // renderizando la grafica

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Tareas Completadas",
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
};
