import React, { useState, useEffect } from "react";
import Table from "../components/table";
import ButtonGroup from "../components/buttonGroup";
import DropDown from "../components/dropdown";
import DialogBox from "../components/dialog";
import http from "../services/http";
import config from "../config.json";

const Home = () => {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({});
  const [filteredModules, setFilteredModules] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [studyProgrammes, setStudyProgrammes] = useState([]);
  const [selectedStudyProgramme, setSelectedStudyProgramme] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getModules();
    getStudyProgramme();
  }, []);

  const getModules = async () => {
    console.log("called");
    try {
      const { data: modules } = await http.get(config.apiEndpoint + "modules");
      setModules(modules);
      setFilteredModules(
        modules.filter((m) => m.URL === "NULL" || m.HasPrerequisite === 0)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getStudyProgramme = async () => {
    try {
      const { data: studyprogrammes } = await http.get(
        config.apiEndpoint + "studyprogramme"
      );
      setStudyProgrammes(studyprogrammes);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.root}>
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
          getModules();
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
