import React from "react";
import Button from "../components/button";

const NoAuthorisation = () => {
  return (
    <div>
      <h1>Error 403 - Forbidden</h1>
      <Button
        variant="contained"
        color="primary"
        label={"GO BACK"}
        onClick={() => (window.location = "/login")}
      />
    </div>
  );
};

export default NoAuthorisation;
