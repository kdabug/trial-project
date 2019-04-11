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
      userQuestions: [],
      showAdd: false,
      toggleShowHistory: false,
      userInputData: {}
    };
    this.getUsersQuestions = this.getUsersQuestions.bind(this);
    this.getGameHistory = this.getGameHistory.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.addUserQuestion = this.addUserQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  async handleSubmit(e) {
    e.preventDefault();
    const resp = await createQuestion(
      this.props.categoryData.id,
      this.state.userInputData
    );
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
    this.setState(prevState => ({
      userCategories
    }));
  }

  async addUserCategory() {
    const category = await createCategory();
    this.setState(prevState => ({
      toggleShowHistory: !prevState.toggleShowHistory
    }));
  }
  async addUserQuestion() {
    const addedQuestion = await createQuestion();
  }

  async handleDeleteUser(id) {
    const deletedUser = await deleteUser(this.props.userData.id);
  }

  async handleDeleteQuestion(id) {
    const deletedUser = await deleteUser(this.props.userData.id);
  }
  async handleDeleteCategory(id) {
    const deletedUser = await deleteUser(this.props.userData.id);
  }

  handleAddCategory(e) {
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
        "this is user ComponentDidMount on UserProfile Component",
        user
      );
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
              <button className="user-button" onClick={this.handleAddCategory}>
                Create Custom Category
              </button>
              <button className="user-button" onClick={this.handleDeleteUser}>
                Delete User
              </button>
            </div>
            <div className="user-categories-container">
              <h1>Your Categories:</h1>
              {this.state.userQuestions.map((category, i) => (
                <CategoryDetails
                  categoryData={category}
                  handleChange={this.handleChange}
                  handleSubmit={this.addUserQuestion}
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
                  <CreateCategory />
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
