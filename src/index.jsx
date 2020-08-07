import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./index.css";
import "./translater/i18n";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
