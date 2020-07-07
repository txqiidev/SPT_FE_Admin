import React, { useState, useEffect } from "react";
import Table from "../components/table";
import ButtonGroup from "../components/buttonGroup";
import http from "../services/http";
import axios from "axios";
import config from "../config.json";

const Home = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/modules")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  });

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.header}>
          <ButtonGroup></ButtonGroup>
          <ButtonGroup></ButtonGroup>
        </div>
        <Table></Table>
      </div>
    </div>
  );
};

export default Home;

const styles = {
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    width: "50%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
};
