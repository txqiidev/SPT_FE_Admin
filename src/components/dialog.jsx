import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CustomButton from "../components/button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const DialogBox = (props) => {
  const { module } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{module.Name}</DialogTitle>
      <DialogContent>
        <DialogContentText>URL of Module Description</DialogContentText>
        {module.URL === "NULL" && (
          <DialogContentText className={classes.italic}>None</DialogContentText>
        )}
        <div className={classes.form}>
          <TextField
            className={classes.textField}
            margin="dense"
            id="url"
            label="URL"
            defaultValue={module.URL !== "NULL" ? module.URL : ""}
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={module.URL !== "NULL" ? "CHANGE" : "ADD"}
          >
            EDIT
          </CustomButton>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.onClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogBox;

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField: {
    marginRight: theme.spacing(1),
    minWidth: 350,
  },
  italic: {
    fontStyle: "italic",
    fontSize: 14,
  },
  titel: {
    fontSize: 18,
    fontWeight: 600,
  },
}));
