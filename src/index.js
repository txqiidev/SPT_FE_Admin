import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./index.css";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router />
  </MuiThemeProvider>,
  document.getElementById("root")
);
