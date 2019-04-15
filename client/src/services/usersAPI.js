import axios from "axios";
const { api, updateToken } = require("./apiHelper");

const BASE_URL = "http://localhost:3000";

const registerUser = async registerData => {
  const respData = await axios.post(`${BASE_URL}/users`, {
    user: registerData
  });
  console.log("this is create user: resp", respData);
  return respData.data;
};

const loginUser = async ({ email, password }) => {
  const resp = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password
  });
  const data = resp.data;
  await updateToken(data.token);
  //const setToken = localStorage.setItem("token", data.token);
  console.log("this is login resp data", data.token);
  return data;
};

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (token == null) {
    return false;
  } else {
    updateToken(token);
    return true;
  }
};

const fetchUserData = async id => {
  console.log("this is fetch user data api", api);
  const respData = await api.get(`/users/${id}`);
  console.log("this is current userData: resp", respData);
  return respData;
};

const updateUser = async (id, edits) => {
  const respData = await api.put(`/users/${id}/`, { user: edits });
  console.log("this is update user: resp", respData);
  return respData;
};

const deleteUser = async id => {
  const respData = await api.delete(`/users/${id}/`, { params: { id: id } });
  console.log("this is delete user: resp", respData);
  return respData;
};

const fetchUserHistory = async id => {
  const respData = await api.get(`/games/${id}/`);
  console.log("this is fetchUserHistory: resp", respData);
  return respData;
};

const addUserScore = async currentScore => {
  const respData = await api.post(`/games`, questionData);
  console.log("this is add game score: resp", respData);
  return respData.data;
};

export {
  fetchUserData,
  fetchUserHistory,
  addUserScore,
  updateUser,
  registerUser,
  loginUser,
  deleteUser,
  verifyToken
};
