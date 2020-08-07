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
import Alert from "./alert";
import { withNamespaces } from "react-i18next";

const DialogBox = (props) => {
  const { module: dialogModule, open } = props;
  const [module, setModule] = useState({});
  const [url, setURL] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [checked, setChecked] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [prerequisites, setPrerequisites] = useState([]);

  const classes = useStyles();

  // fetches the prerequisites modules
  useEffect(() => {
    if (open) {
      updateModule(dialogModule.idModule);
      setChecked(dialogModule.HasPrerequisite === 2 ? true : false);
      modification
        .getPrerequisites(dialogModule.idModule)
        .then((result) => setPrerequisites(result));
    }
  }, [dialogModule, open]);

  const updateModule = (id) => {
    calling.getModule(id).then((result) => setModule(result));
  };

  // Handler for the checkbox "Module has no prerequisite Module"
  const onChangeHandlerCheck = async () => {
    modification
      .updateHasPrerequisite(module.idModule, !checked ? 2 : 0)
      .then((result) => {
        setChecked(!checked);
        updateModule(dialogModule.idModule);
      });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{module.Name}</DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.titel}>
          {props.t("URLofMD")}
        </DialogContentText>
        {module.URL === "NULL" && (
          <DialogContentText className={classes.italic}>
            {props.t("None")}
          </DialogContentText>
        )}
        <div className={classes.form}>
          <TextField
            className={classes.textField}
            margin="dense"
            id="url"
            label="URL"
            defaultValue={dialogModule.URL !== "NULL" ? dialogModule.URL : ""}
            fullWidth
            variant="outlined"
            color="secondary"
            onChange={(event) => setURL(event.target.value)}
          />
          <CustomButton
            variant="contained"
            color="primary"
            label={module.URL !== "NULL" ? props.t("Change") : props.t("Add")}
            onClick={() =>
              modification
                .updateURL(module.idModule, url)
                .then(() =>
                  setAlert({
                    open: true,
                    message: `URL ${props.t("URLChangeMessage")}`,
                    severity: "success",
                  })
                )
                .catch((e) =>
                  setAlert({
                    open: true,
                    message: e,
                    severity: "error",
                  })
                )
            }
          />
        </div>
        <DialogContentText className={classes.titel} style={{ marginTop: 50 }}>
          {props.t("Prerequisite")}
        </DialogContentText>
        {module.HasPrerequisite !== 1 && (
          <DialogContentText className={classes.italic}>
            {props.t("None")}
          </DialogContentText>
        )}
        {prerequisites.map((prereq) => (
          <div
            key={prereq.idModule}
            className={classes.form}
            style={{ marginTop: 5, marginBottom: 5 }}
          >
            <DialogContentText>{prereq.Name}</DialogContentText>
            <CustomButton
              variant="contained"
              color="primary"
              label={props.t("Delete")}
              onClick={() =>
                modification
                  .deletePrerequisite(module, prereq.idModule, prerequisites)
                  .then((result) => {
                    setPrerequisites(result);
                    updateModule(dialogModule.idModule);
                    setAlert({
                      open: true,
                      message: `${prereq.Name} ${props.t("DeleteMessage")}`,
                      severity: "success",
                    });
                  })
              }
            />
          </div>
        ))}
        {module.HasPrerequisite !== 2 && (
          <div className={classes.form}>
            <DropDown
              menuItems={props.menuItems}
              onChange={(value) => {
                setSelectedModule(value);
              }}
              selected={selectedModule}
              label={props.t("Modules")}
            />
            <CustomButton
              variant="contained"
              color="primary"
              label={props.t("Add")}
              onClick={() =>
                modification
                  .insertPrerequisite(module, selectedModule)
                  .then((result) => {
                    modification
                      .getPrerequisites(module.idModule)
                      .then((result) => {
                        setPrerequisites(result);
                        updateModule(dialogModule.idModule);
                        setAlert({
                          open: true,
                          message: `${
                            result.find((m) => (m.idMoule = selectedModule))
                              .Name
                          } ${props.t("PreModuleAddMessage")}`,
                          severity: "success",
                        });
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
            label={props.t("ModuleNoPreModule")}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.onClose}
          color="secondary"
          className={classes.exit}
        >
          {props.t("Done")}
        </Button>
      </DialogActions>
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClick={(reason) => handleClose(reason)}
      ></Alert>
    </Dialog>
  );
};

export default withNamespaces()(DialogBox);

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
    fontWeight: 600,
  },
  exit: {
    fontWeight: 600,
    marginTop: 15,
    marginBottom: 5,
    color: "black",
  },
}));
