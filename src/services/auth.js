import http from "./http";
import config from "../config.json";

const tokenKey = "token";

const login = async (email, password) => {
  const { data } = await http.post(config.apiEndpoint + "user/authentication", {
    email,
    password,
  });
  localStorage.setItem(tokenKey, data);
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export default { login, logout, getJwt };
