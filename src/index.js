import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MasterServer from "./components/MasterServer";
import Client from "./components/Client";
const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<MasterServer />} />
        <Route path="/:ip" element={<Client />} />
        {/* <Route path="invoices" element={<Invoices />} /> */}
      </Routes>
    </Provider>
  </BrowserRouter>,
  rootElement
);
