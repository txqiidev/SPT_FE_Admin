import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Button from "./button";

const SimpleTable = (props) => {
  const classes = useStyles();
  const { modules } = props;

  const getIcon = (value) => {
    if (value === "NULL" || value === 0) {
      return <CloseIcon style={{ color: "#ff0000" }} />;
    } else {
      return <CheckIcon style={{ color: "#00ff00" }} />;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.fontWeight}>Name</TableCell>
            <TableCell className={classes.fontWeight} align="center">
              URL
            </TableCell>
            <TableCell className={classes.fontWeight} align="center">
              Dependencies
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((modules) => (
            <TableRow key={modules.Name}>
              <TableCell component="th" scope="row">
                {modules.Name}
              </TableCell>
              <TableCell align="center">{getIcon(modules.URL)}</TableCell>
              <TableCell align="center">
                {getIcon(modules.HasPrerequisite)}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  label={"EDIT"}
                  onClick={() => props.onClick(modules)}
                >
                  EDIT
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  fontWeight: {
    fontWeight: 600,
  },
});
