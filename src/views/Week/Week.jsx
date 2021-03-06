//  componente de gráfica

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTask } from "../../services/queries";
import Layout from "../../components/Layout/Layout";
import createChart from "../../utils/createChart";

const Week = ({ user }) => {
  // crear el componente de graficos
  useEffect(() => {
    const getTaskMethod = async () => {
      createChart(await getTask(user.uid));
    };
    getTaskMethod();
  }, []);

  return (
    <Layout>
      <h1>Últimos 7 días</h1>
      <canvas id="myChart" width="400" height="200"></canvas>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    taskList: state.taskList,
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Week);
