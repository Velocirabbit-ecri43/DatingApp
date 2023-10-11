import React from "react";
import PrefPage from "./preference.jsx";
import App from "./App.jsx";
import "./styles.scss";
import { createRoot } from "react-dom/client";
import { store } from "./reduxStores/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
