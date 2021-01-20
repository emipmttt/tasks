import Chart from "chart.js";

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
    const dayName = date.toLocaleString("es-mx", { weekday: "long" });

    preData[dayName] = preData[dayName] ? preData[dayName] + 1 : 1;
  });

  Object.keys(preData).forEach((key) => {
    labels.push(key);
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
