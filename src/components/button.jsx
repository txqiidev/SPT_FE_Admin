import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const CustomButton = (props) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="Primary">
      {props.label}
    </Button>
  );
};

export default CustomButton;

const useStyles = makeStyles({
  button: {
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#C7C7C7",
    },
  },
});
