import http from "./http";
import config from "../config.json";

const getPrerequisites = async (id) => {
  try {
    const { data: prereqModules } = await http.get(
      config.apiEndpoint + `admin/modules/PrerequisiteModules/${id}`
    );
    return prereqModules;
  } catch (error) {
    console.error(error);
  }
};

const updateURL = async (id, url) => {
  try {
    const response = await http.put(config.apiEndpoint + "admin/modules/URLs", {
      id: id,
      url: url,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("1", error.response.data);
    return Promise.reject(error.response.data);
  }
};

const updateHasPrerequisite = async (id, num) => {
  try {
    const response = await http.put(
      config.apiEndpoint + "admin/modules/HasPrerequisite",
      {
        id: id,
        hasPrerequisite: num,
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const insertPrerequisite = async (module, selectedModule) => {
  try {
    const response = await http.post(
      config.apiEndpoint + "admin/modules/Prerequisite",
      {
        id: module.idModule,
        idPrerequisite: selectedModule,
      }
    );
    console.log(response);
    if (module.HasPrerequisite === 0) {
      updateHasPrerequisite(module.idModule, 1);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deletePrerequisite = async (module, prereqId, prerequisites) => {
  try {
    const response = await http.delete(
      config.apiEndpoint + "admin/modules/Prerequisite",
      {
        data: {
          id: module.idModule,
          idPrerequisite: prereqId,
        },
      }
    );
    console.log(response);
    const newArray = prerequisites.filter((pre) => {
      return pre.idModule !== prereqId;
    });
    if (newArray.length === 0) {
      updateHasPrerequisite(module.idModule, 0);
    }
    return newArray;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getPrerequisites,
  updateURL,
  updateHasPrerequisite,
  insertPrerequisite,
  deletePrerequisite,
};
