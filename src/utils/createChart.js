import Chart from "chart.js";
import numberDayToText from "../utils/numberDayToText";

export default (taskList) => {
  const lastWeek = taskList.filter((taskItem) => {
    let date = new Date();
    date.setDate(date.getDate() - 7);
    const sevenDays = date.getTime();
    return taskItem.finishedAt >= sevenDays;
  });

  var labels = [];
  var data = [];
  var backgroundColor = [];
  var borderColor = [];

  var preData = {};

  lastWeek.forEach((taskItem) => {
    const date = new Date(taskItem.finishedAt);
    const dayNumber = date.getDay();

    preData[dayNumber] = preData[dayNumber] ? preData[dayNumber] + 1 : 1;
  });

  var arrData = Object.keys(preData);

  arrData = arrData.sort(
    (a, b) => preData[b].finishedAt - preData[a].finishedAt
  );
  console.log(arrData);

  arrData.forEach((key) => {
    labels.push(numberDayToText(key));
    data.push(preData[key]);
    backgroundColor.push("rgba(54, 162, 235, 0.2)");
    backgroundColor.push("rgba(54, 162, 235, 0.2)");
  });

  console.log(data, labels);

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
