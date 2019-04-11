import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DisplayGameHistory from "./DisplayGameHistory";
import decode from "jwt-decode";
import {
  fetchQuestions,
  deleteQuestion,
  updateQuestion,
  createQuestion,
  fetchCategories,
  createCategory,
  deleteCategory,
  updateCategory
} from "../services/createCustomGameAPI.js";
import { fetchUserHistory, deleteUser } from "../services/usersAPI";
import CategoryDetails from "./CategoryDetails";
import CreateCategory from "./CreateCategory";

class UserProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameHistory: [],
      userCreated: {},
      showAdd: false,
      toggleShowHistory: false,
      userInput: {
        category: "",
        question: {
          question: "",
          answer: ""
        }
      }
    };
    this.getUsersQuestions = this.getUsersQuestions.bind(this);
    this.getGameHistory = this.getGameHistory.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.toggleAddCategory = this.toggleAddCategory.bind(this);
    this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
    this.handleSubmitCategory = this.handleSubmitCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleShowHistory = this.handleShowHistory.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userInputData: {
        ...prevState.commentData,
        [name]: value
      }
    }));
  }
  async handleQuestionSubmit(e) {
    e.preventDefault();
    const resp = await createQuestion(this.state.userInputData.question);
    console.log(resp);
    this.setState(prevState => ({
      userInputData: {
        ...prevState.userInputData
      }
    }));
  }
  async handleCategorySubmit(e) {
    e.preventDefault();
    const resp = await createCategory(this.state.userInputData.category);
    console.log(resp);
    this.setState(prevState => ({
      userInputData: {
        ...prevState.userInputData
      }
    }));
  }
  async getGameHistory() {
    const gameHistory = await fetchUserHistory(this.props.userData.id);
    this.setState(prevState => ({
      gameHistory: gameHistory
    }));
  }

  async getUsersQuestions() {
    const userCategories = await fetchCategories(this.props.userData.id);
    const userQuestions = await fetchQuestions(this.props.userData.id);
    console.log("this is userQs get userQs", userQuestions);
    this.setState(prevState => ({
      userCreated: {
        userCategories,
        userQuestions
      }
    }));
    console.log("this is userQs get userCreated", this.state.userCreated);
  }

  async handleDeleteUser(e) {
    e.preventDefault();
    const deletedUser = await deleteUser(this.props.userData.id);
  }
  async handleDeleteQuestion(e, id) {
    e.preventDefault();
    const deletedQuestion = await deleteQuestion(id);
  }
  async handleDeleteCategory(e, id) {
    e.preventDefault();
    const deletedCategory = await deleteCategory(id);
  }

  toggleAddCategory(e) {
    e.preventDefault();
    this.setState(prevState => ({ showAdd: !prevState.showAdd }));
  }
  handleShowHistory(e) {
    e.preventDefault();
    this.setState(prevState => ({
      toggleShowHistory: !prevState.toggleShowHistory
    }));
  }

  async componentDidMount() {
    const checkUser = await localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      console.log(
        "this is cdm on UserProfile Component, user",
        user,
        this.props
      );
      await this.getUsersQuestions();
    }
  }
  render() {
    return (
      <>
        <div className="user-profile">
          <div className="user-container">
            <div className="avatar-username">
              <div
                className={`avatar-${this.props.userData.avatar}` || "avatar-1"}
              />
              <h2>{this.props.userData.username}</h2>
            </div>
            <p>Email: {this.props.userData.email}</p>
            <div className="button-container">
              <button
                className="user-button"
                onClick={() =>
                  this.props.history.push(
                    `/user/${this.props.match.params.id}/edit/`
                  )
                }
              >
                Edit User
              </button>
              <button className="user-button" onClick={this.handleShowHistory}>
                Show Game History
              </button>
              <button className="user-button" onClick={this.toggleAddCategory}>
                Create Custom Category
              </button>
              <button className="user-button" onClick={this.handleDeleteUser}>
                Delete User
              </button>
            </div>
            <div className="user-categories-container">
              <h1>Your Categories:</h1>
              {this.state.userCreated.userCategories.map((category, i) => (
                <CategoryDetails
                  categoryData={category}
                  questions={this.state.userCreated.userQuestions}
                  handleChange={this.handleChange}
                  handleQuestionSubmit={this.addUserQuestion}
                  handleDeleteCategory={this.handleDeleteCategoy}
                  handleDeleteQuestion={this.handleDeleteQuestion}
                />
              ))}
            </div>
            {this.state.toggleShowHistory && (
              <div className="game-history-container">
                <h1>Game History:</h1>
                <>
                  <DisplayGameHistory />
                </>
              </div>
            )}

            {this.state.showAdd && (
              <div className="create-category-container">
                <h1>Add Category:</h1>
                <>
                  <CreateCategory
                    onSubmit={this.handleSubmitCategory}
                    onChange={this.handleChange}
                    category={this.state.userInput.category}
                  />
                </>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(UserProfilePage);
