import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const createCategory = async category => {
  const respData = await axios.post(`${BASE_URL}/users/register`, user);
  console.log("this is create category: resp", respData);
  return respData;
};

const updateCategory = async (id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await axios.put(`${BASE_URL}/planets/${id}/`, edits);
  console.log("this is edit category: resp", respData);
  return respData;
};

const fetchCategories = async () => {
  const respData = await axios.get(`${BASE_URL}/planets`);
  console.log("this is fetch category: resp", respData);
  return respData;
};

const deleteCategory = async id => {
  const respData = await axios.delete(`${BASE_URL}/planets/${id}`);
  console.log("this is delete category: resp", respData);
  return respData;
};

const createQuestion = async questionData => {
  const respData = await axios.post(`${BASE_URL}/users/register`, user);
  console.log("this is create question: resp", respData);
  return respData;
};

const updateQuestion = async (id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await axios.put(`${BASE_URL}/planets/${id}/`, edits);
  console.log("this is edit question: resp", respData);
  return respData;
};

const fetchQuestions = async () => {
  const respData = await axios.get(`${BASE_URL}/planets`);
  console.log("this is fetch questions: resp", respData);
  return respData;
};

const deleteQuestion = async questionData => {
  const respData = await axios.delete(`${BASE_URL}/planets/${questionData.id}`);
  console.log("this is delete questions: resp", respData);
  return respData;
};

export {
  fetchQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory
};
