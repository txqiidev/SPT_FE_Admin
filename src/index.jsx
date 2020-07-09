import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./index.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={history}>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
