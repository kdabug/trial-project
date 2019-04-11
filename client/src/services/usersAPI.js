import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  }
});

const registerUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/create`, user);
  console.log("this is create user: resp", respData);
  return respData;
};

const loginUser = async ({ email, password }) => {
  const resp = await axios.post(`${BASE_URL}/user_token`, {
    auth: {
      email,
      password
    }
  });
  const data = resp.data;
  return data;
};

const fetchUserData = async () => {
  console.log("this is fetch user data api", api);
  const respData = await api.get(`/users/show`);
  console.log("this is current userData: resp", respData);
  return respData;
};

const updateUser = async (id, edits) => {
  const respData = await api.put(`/users/${id}/`, edits);
  console.log("this is update user: resp", respData);
  return respData;
};

const deleteUser = async id => {
  const respData = await api.delete(`/users/${id}/`);
  console.log("this is delete user: resp", respData);
  return respData;
};

const fetchUserHistory = async id => {
  const respData = await api.get(`}/games/${id}/`);
  console.log("this is fetchUserCategories: resp", respData);
  return respData;
};

export {
  fetchUserData,
  fetchUserHistory,
  updateUser,
  registerUser,
  loginUser,
  deleteUser
};
