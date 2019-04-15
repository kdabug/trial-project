import axios from "axios";
const api = axios.create({
  baseURL: "https://evening-citadel-66548.herokuapp.com"
});

const updateToken = token => {
  localStorage.setItem("token", token);
  api.defaults.headers.common.authorization = `Bearer ${token}`;
};

export { api, updateToken };
