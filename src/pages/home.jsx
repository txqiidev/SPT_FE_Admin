import React, { useState, useEffect } from "react";
import Table from "../components/table";
import ButtonGroup from "../components/buttonGroup";
import DropDown from "../components/dropdown";
import DialogBox from "../components/dialog";
import auth from "../services/auth";
import calling from "../services/getData";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { withNamespaces } from "react-i18next";

const Home = (props) => {
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState({});
  const [filteredModules, setFilteredModules] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [studyProgrammes, setStudyProgrammes] = useState([]);
  const [selectedStudyProgramme, setSelectedStudyProgramme] = useState("All");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // fetches the study programmes during the first render of the component
  useEffect(() => {
    calling.getStudyProgramme().then((result) => setStudyProgrammes(result));
  }, []);

  // fetches the modules of a chosen study programme
  useEffect(() => {
    if (!open) {
      calling.getModules(selectedStudyProgramme).then((result) => {
        setModules(result);
        setFilteredModules(
          result.filter((m) => m.URL === "NULL" || m.HasPrerequisite === 0)
        );
        setLoading(false);
      });
    }
  }, [open, selectedStudyProgramme]);

  const doLogOut = () => {
    auth.logout();
    window.location = "/login";
  };

  const changeLanguage = (lng) => {
    localStorage.setItem("language", lng);
    props.i18n.changeLanguage(lng);
  };

  return (
    <div style={styles.root}>
      <div style={styles.navBar}>
        <div style={styles.language}>
          <span
            onClick={() => changeLanguage("en")}
            style={{
              ...styles.buttonsLanguage,
              ...{
                fontWeight:
                  localStorage.getItem("language") !== "de" ? 600 : 300,
              },
            }}
          >
            EN
          </span>
          <span
            onClick={() => changeLanguage("de")}
            style={{
              ...styles.buttonsLanguage,
              ...{
                fontWeight:
                  localStorage.getItem("language") === "de" ? 600 : 300,
              },
            }}
          >
            DE
          </span>
        </div>{" "}
        <Button onClick={() => doLogOut()} style={styles.logout}>
          {props.t("Logout")}
        </Button>
      </div>
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
            label={props.t("StudyProgramme")}
            showAll={true}
          />
        </div>
        {!loading ? (
          <Table
            modules={isAll ? modules : filteredModules}
            onClick={(module) => {
              setOpen(true);
              setCurrentModule(module);
            }}
          ></Table>
        ) : (
          <div style={styles.progress}>
            <CircularProgress color="secondary" />
          </div>
        )}
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

export default withNamespaces()(Home);

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
  progress: {
    display: "flex",
    width: "100%",
    height: "70vh",
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    fontWeight: 600,
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
  },
  navBar: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  language: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonsLanguage: {
    marginTop: 5,
    marginBottom: 5,
    color: "#313639",
    cursor: "pointer",
    marginLeft: 10,
    fontSize: 16,
  },
};
