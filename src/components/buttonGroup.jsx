import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const BasicButtonGroup = (props) => {
  const classes = useStyles();

  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
    >
      <Button
        className={props.isAll ? classes.selected : classes.notSelected}
        onClick={() => props.onClick(true)}
      >
        All
      </Button>
      <Button
        className={!props.isAll ? classes.selected : classes.notSelected}
        onClick={() => props.onClick(false)}
      >
        Incomplete
      </Button>
    </ButtonGroup>
  );
};

export default BasicButtonGroup;

const useStyles = makeStyles({
  selected: {
    fontWeight: 600,
    backgroundColor: "#C7C7C7",
    "&:hover": {
      backgroundColor: "#C7C7C7",
    },
  },
  notSelected: {
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#C7C7C7",
    },
  },
});
