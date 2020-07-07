import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "./button";

const createData = (name, url, dependencies) => {
  return { name, url, dependencies };
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Frozen yoghurt", 159, 6.0),
];

const SimpleTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.fontWeight}>Name</TableCell>
            <TableCell className={classes.fontWeight} align="right">
              URL
            </TableCell>
            <TableCell className={classes.fontWeight} align="right">
              Dependencies
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.url}</TableCell>
              <TableCell align="right">{row.dependencies}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="Primary" label={"EDIT"}>
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
