import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const BasicButtonGroup = () => {
  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
    >
      <Button>All</Button>
      <Button>Incomplete</Button>
    </ButtonGroup>
  );
};
export default BasicButtonGroup;
