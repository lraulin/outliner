// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { TreeProvider } from "./TreeContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <TreeProvider>
    <App />
  </TreeProvider>
);
