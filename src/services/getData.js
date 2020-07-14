import http from "./http";
import config from "../config.json";

const getModule = async (id) => {
  try {
    const { data: module } = await http.get(
      config.apiEndpoint + `admin/modules/${id}`
    );
    return module;
  } catch (error) {
    console.error(error);
  }
};

const getModules = async () => {
  try {
    const { data: modules } = await http.get(
      config.apiEndpoint + "admin/modules"
    );
    return modules;
  } catch (error) {
    console.error(error);
  }
};

const getStudyProgramme = async () => {
  try {
    const { data: studyprogrammes } = await http.get(
      config.apiEndpoint + "studyprogramme"
    );
    return studyprogrammes;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getModule,
  getModules,
  getStudyProgramme,
};
