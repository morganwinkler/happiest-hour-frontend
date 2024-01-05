import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

axios.defaults.baseURL =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://happiest-hour-api.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
