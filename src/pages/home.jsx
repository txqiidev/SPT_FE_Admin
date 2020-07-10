import React, { useState, useEffect } from "react";
import Table from "../components/table";
import ButtonGroup from "../components/buttonGroup";
import DropDown from "../components/dropdown";
import DialogBox from "../components/dialog";
import http from "../services/http";
import config from "../config.json";
import auth from "../services/auth";
import calling from "../services/getData";

const Home = () => {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({});
  const [filteredModules, setFilteredModules] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [studyProgrammes, setStudyProgrammes] = useState([]);
  const [selectedStudyProgramme, setSelectedStudyProgramme] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    calling.getStudyProgramme().then((result) => setStudyProgrammes(result));
  }, []);

  useEffect(() => {
    if (!open) {
      calling.getModules().then((result) => {
        setModules(result);
        setFilteredModules(
          result.filter((m) => m.URL === "NULL" || m.HasPrerequisite === 0)
        );
      });
    }
  }, [open]);

  const doLogOut = () => {
    auth.logout();
    window.location = "/login";
  };

  return (
    <div style={styles.root}>
      <p onClick={() => doLogOut()}>LOGOUT</p>
      <div style={styles.container}>
        <div style={styles.header}>
          <ButtonGroup
            onClick={(value) => isAll !== value && setIsAll(!isAll)}
            isAll={isAll}
          ></ButtonGroup>
          <DropDown
            menuItems={studyProgrammes.map(({ idStudyProgramme, Name }) => ({
              id: idStudyProgramme,
              name: Name,
            }))}
            onChange={(value) => setSelectedStudyProgramme(value)}
            selected={selectedStudyProgramme}
            label={"Studyprogramme"}
          />
        </div>
        <Table
          modules={isAll ? modules : filteredModules}
          onClick={(module) => {
            setOpen(true);
            setCurrentModule(module);
          }}
        ></Table>
      </div>
      <DialogBox
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        module={currentModule}
        hasPrerequisite={currentModule.HasPrerequisite === 0 ? true : false}
        menuItems={modules.map(({ idModule, Name }) => ({
          id: idModule,
          name: Name,
        }))}
      />
    </div>
  );
};

export default Home;

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
    maxWidth: 700,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
};
