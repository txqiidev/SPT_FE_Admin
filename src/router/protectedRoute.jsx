import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../services/auth";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) {
          return <Redirect to="/login" />;
        } else if (auth.getCurrentUser().isAdmin === 0) {
          return <Redirect to="/no-authorisation" />;
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
