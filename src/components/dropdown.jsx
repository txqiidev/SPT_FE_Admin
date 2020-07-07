import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const Dropdown = (props) => {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Studyprogramme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.studyProgramme}
          onChange={(event) => props.onChange(event.target.value)}
        >
          <MenuItem value={0}>
            <em>All</em>
          </MenuItem>
          {props.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.idStudyProgramme}
              value={menuItem.idStudyProgramme}
            >
              {menuItem.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));
