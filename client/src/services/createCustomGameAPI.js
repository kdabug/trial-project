const { api, updateToken } = require("./apiHelper");

////////CATEGORIES

const createCategory = async (id, category) => {
  const respData = await api.post(`/categories`, {
    category: category,
    user_id: id
  });
  console.log("this is create category: resp", respData);
  return respData.data;
};

const updateCategory = async (user_id, cat_id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await api.put(
    `/users/${user_id}/categories/${cat_id}`,
    edits
  );
  console.log("this is edit category: resp", respData);
  return respData.data;
};

const fetchCategories = async id => {
  const respData = await api.get(`/categories`, { user_id: id });
  console.log("this is fetch category: resp", respData);
  return respData.data;
};

const deleteCategory = async cat_id => {
  const respData = await api.delete(`/categories/${cat_id}`);
  console.log("this is delete category: resp", respData);
  return respData.data;
};

/////QUESTIONS
const createQuestion = async questionData => {
  const respData = await api.post(`/questions`, questionData);
  console.log("this is create question: resp", respData);
  return respData.data;
};

const updateQuestion = async (quest_id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await api.put(`/questions/${quest_id}`, edits);
  console.log("this is edit question: resp", respData);
  return respData.data;
};

const fetchQuestions = async user_id => {
  const respData = await api.get(`/questions`, {
    params: { user_id: user_id }
  });
  console.log("this is fetch questions: resp", respData);
  return respData.data;
};

const deleteQuestion = async id => {
  const respData = await api.delete(`/questions/${id}`);
  console.log("this is delete questions: resp", respData);
  return respData.data;
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
