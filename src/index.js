import React from "react";
import ReactDOM from "react-dom";

// Componente principal
import App from "./App";

// componentes de redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers";

// estado global
const initialState = {
  user: {},
  taskList: [],
};

// creando estado global
const store = createStore(reducers, initialState);

// Renderizando proyecto completo
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
