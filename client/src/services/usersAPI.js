import axios from "axios";

const BASE_URL = "http://localhost:3000/";

// get "sessions/new"
//   get "/users/verify", to: "users#verify"
//   post "/users/login", to: "users#login"
//   get "/logout", to: "sessions#destroy"
//   get "/login", to: "sessions#new"
//   post "/login" => "sessions#create"

const registerUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/create`, user);
  console.log("this is create user: resp", respData);
  return respData;
};

const loginUser = async ({ email, password }) => {
  const login = await axios.get(`${BASE_URL}/login`);
  const resp = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password
  });
  const data = resp.data;
  //updateToken(data.token);
  return data;
};

const logoutUser = async ({ email, password }) => {
  const logOut = await axios.get(`${BASE_URL}/logout`);
};

const verifyUser = async () => {
  const token = await localStorage.getItem("jwt");
  if (token === null) {
    console.log("no token");
    return false;
  } else {
    try {
      console.log("token verified", token);
      const resp = await axios.get(`${BASE_URL}/users/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // updateToken(token);
      console.log("this is verify token resp", resp.data);
      return resp.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};

const updateUser = async (id, edits) => {
  console.log("making an updat user request with this data", edits);
  const respData = await axios.put(`${BASE_URL}/users/${id}/`, edits);
  console.log("this is update user: resp", respData);
  return respData;
};

const fetchUserHistory = async id => {
  const respData = await axios.get(`${BASE_URL}/games/${id}/`);
  console.log("this is fetchUserCategories: resp", respData);
  return respData;
};

export {
  fetchUserHistory,
  fetchUserQuestions,
  updateUser,
  registerUser,
  loginUser,
  logoutUser,
  verifyUser
};
