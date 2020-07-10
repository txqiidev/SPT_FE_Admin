import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CustomButton from "../components/button";
import DropDown from "../components/dropdown";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import modification from "../services/modifications";
import calling from "../services/getData";

const DialogBox = (props) => {
  const { module: dialogModule, open } = props;
  const [module, setModule] = useState({});
  const [url, setURL] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [checked, setChecked] = useState();
  const [prerequisites, setPrerequisites] = useState([]);
  const [response, setResponse] = useState({});

  const classes = useStyles();

  useEffect(() => {
    if (open) {
      console.log(open);
      updateModule(dialogModule.idModule);
      setChecked(dialogModule.HasPrerequisite === 0 ? false : true);
      modification
        .getPrerequisites(dialogModule.idModule)
        .then((result) => setPrerequisites(result));
    }
  }, [dialogModule, open]);

  const updateModule = (id) => {
    calling.getModule(id).then((result) => setModule(result));
  };

  const onChangeHandlerCheck = async () => {
    modification
      .updateHasPrerequisite(module.idModule, !checked ? 2 : 0)
      .then((result) => {
        setResponse(result);
        setChecked(!checked);
        updateModule(dialogModule.idModule);
      });
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
            onClick={() =>
              modification
                .updateURL(module.idModule, url)
                .then((result) => setResponse(result))
            }
          />
        </div>
        <DialogContentText>Prerequisite Module(s)</DialogContentText>
        {module.HasPrerequisite !== 1 && (
          <DialogContentText className={classes.italic}>None</DialogContentText>
        )}
        {prerequisites.map((prereq) => (
          <div key={prereq.idModule} className={classes.form}>
            <DialogContentText>{prereq.Name}</DialogContentText>
            <CustomButton
              variant="contained"
              color="primary"
              label={"DELETE"}
              onClick={() =>
                modification
                  .deletePrerequisite(module, prereq.idModule, prerequisites)
                  .then((result) => {
                    setPrerequisites(result);
                    updateModule(dialogModule.idModule);
                  })
              }
            />
          </div>
        ))}
        {module.HasPrerequisite !== 2 && (
          <div className={classes.form}>
            <DropDown
              menuItems={props.menuItems}
              onChange={(value, name) => {
                setSelectedModule(value);
                console.log(name);
              }}
              selected={selectedModule}
              label={"Modules"}
            />
            <CustomButton
              variant="contained"
              color="primary"
              label={"ADD"}
              onClick={() =>
                modification
                  .insertPrerequisite(module, selectedModule)
                  .then((result) => {
                    setResponse(result);
                    modification
                      .getPrerequisites(module.idModule)
                      .then((result) => {
                        setPrerequisites(result);
                        updateModule(dialogModule.idModule);
                      });
                  })
              }
            />
          </div>
        )}
        {module.HasPrerequisite !== 1 && (
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => onChangeHandlerCheck()}
                name="checked"
              />
            }
            label="Module has no prerequisite Module"
          />
        )}
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
