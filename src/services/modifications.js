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
    const response = await http.put(config.apiEndpoint + "admin/modules/URL", {
      id: id,
      url: url,
    });
    return response;
  } catch (error) {
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
    return response;
  } catch (error) {}
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
    await http.delete(config.apiEndpoint + "admin/modules/Prerequisite", {
      data: {
        id: module.idModule,
        idPrerequisite: prereqId,
      },
    });
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
