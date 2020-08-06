import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withNamespaces } from "react-i18next";

const Dropdown = (props) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="simple-select-label">{props.label}</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={props.selected}
        onChange={(event) => props.onChange(event.target.value)}
        label={props.label}
      >
        {props.showAll && (
          <MenuItem value={"All"}>
            <em>{props.t("All")}</em>
          </MenuItem>
        )}
        {props.menuItems.map((menuItem) => (
          <MenuItem key={menuItem.id} value={menuItem.id}>
            {menuItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withNamespaces()(Dropdown);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
}));
