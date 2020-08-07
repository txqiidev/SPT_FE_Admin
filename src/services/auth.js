import http from "./http";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

const login = async (email, password) => {
  const { data } = await http.post(config.apiEndpoint + "user/authentication", {
    email,
    password,
  });
  // stores JWT token in the local storage of the browser
  localStorage.setItem(tokenKey, data);
};

const logout = () => {
  // deletes JWT token in the local storage of the browser
  localStorage.removeItem(tokenKey);
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

http.setJwt(getJwt());

export default { login, logout, getJwt, getCurrentUser };
