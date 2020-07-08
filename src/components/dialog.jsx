import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CustomButton from "../components/button";
import DropDown from "../components/dropdown";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import http from "../services/http";
import config from "../config.json";

const DialogBox = (props) => {
  const [url, setURL] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const { module } = props;
  const classes = useStyles();

  const onClickHandler = async () => {
    try {
      const response = await http.put(config.apiEndpoint + "modules/URL", {
        id: module.idModule,
        url: url,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
            onChange={(event) => setURL(event.target.value)}
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={module.URL !== "NULL" ? "CHANGE" : "ADD"}
            onClick={() => onClickHandler()}
          >
            EDIT
          </CustomButton>
        </div>
        <DialogContentText>Prerequisite Module(s)</DialogContentText>
        {module.HasPrerequisite === 0 && (
          <DialogContentText className={classes.italic}>None</DialogContentText>
        )}
        <div className={classes.form}>
          <DropDown
            menuItems={props.menuItems}
            onChange={(value) => setSelectedModule(value)}
            selected={selectedModule}
            label={"Modules"}
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={"ADD"}
            onClick={() => onClickHandler()}
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
