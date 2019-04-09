// const BASE_URL = "http://jservice.io/api/category";

// const getBoard = async () => {
//   try {
//     const resp = await axios.get(`${BASE_URL}`, { data: { id: 9 } });
//     console.log(resp.data);
//     return resp.data;
//   } catch (e) {
//     console.log(e);
//   }
// };

import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getBoards = async () => {
  const respData = await axios.get(`${BASE_URL}/get-boards`);
  console.log("this is getBoards: resp", respData);
  return respData.data;
};

const getRandom = async () => {
  const respData = await axios.get(`${BASE_URL}/get-random/`);
  console.log("this is random q: resp", respData);
  return respData.data;
};

export { getBoards, getRandom };
