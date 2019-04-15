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
      userCreated: {
        userCategories: [],
        userQuestions: []
      },
      showAdd: false,
      toggleShowHistory: false,
      userInput: {
        category: "",
        question: "",
        answer: ""
      }
    };
    this.getUsersQuestions = this.getUsersQuestions.bind(this);
    this.getGameHistory = this.getGameHistory.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.toggleAddCategory = this.toggleAddCategory.bind(this);
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategorySubmit = this.handleCategorySubmit.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleShowHistory = this.handleShowHistory.bind(this);
    this.sendToCustomGame = this.sendToCustomGame.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState(prevState => ({
      userInput: {
        ...prevState.userInput,
        [name]: value
      }
    }));
  }
  async handleQuestionSubmit(e, id) {
    e.preventDefault();
    const { question, answer } = this.state.userInput;
    const submittedQuestion = {
      question,
      answer,
      category_id: id,
      user_id: this.props.userData.id
    };
    const resp = await createQuestion(submittedQuestion);
    console.log(resp);
    this.setState(prevState => ({
      userInput: {
        ...prevState.userInput,
        question: "",
        answer: "",
        category_id: ""
      }
    }));
    await this.getUsersQuestions();
  }
  async handleCategorySubmit(e) {
    e.preventDefault();
    const resp = await createCategory(
      this.props.userData.id,
      this.state.userInput.category
    );
    console.log(resp);
    this.setState(prevState => ({
      userInput: {
        ...prevState.userInput,
        category: ""
      }
    }));
    await this.getUsersQuestions();
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
        userCategories: userCategories,
        userQuestions: userQuestions
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
    await this.getUsersQuestions();
  }
  async handleDeleteCategory(e, id) {
    e.preventDefault();
    const deletedCategory = await deleteCategory(id);
    await this.getUsersQuestions();
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

  sendToCustomGame() {
    const gameData = [];
    const { userCategories, userQuestions } = this.state.userCreated;
    console.log("this is userCreated", this.state.userCreated);
    if (userCategories.length > 5) {
      for (let i = 0; i < 6; i++) {
        let theCat =
          userCategories[Math.round(Math.random() * userCategories.length)];
        let theClues = userQuestions.filter(el => el.category_id === theCat.id);
        gameData.push(theCat.push(theClues));
      }
      console.log("this is send to custom game", gameData);
    } else {
      alert(
        "You don't have enough user-data to start a game. Make more categories and clues."
      );
    }
    //this.props.playGame(gameData);
  }

  async componentDidMount() {
    const checkUser = await localStorage.getItem("token");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState(prevState => ({ userData: !prevState.showAdd }));
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
          <div className="avatar-header">
            <div className="avatar-username">
              <div
                className={
                  this.props.userData.avatar_id
                    ? `avatar-${this.props.userData.avatar_id} profile`
                    : "avatar-1 profile"
                }
              />
              <>
                <h2>{this.props.userData.username}</h2>
              </>
            </div>
          </div>
          <div className="user-profile-button-container">
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
            <button className="user-button" onClick={this.toggleAddCategory}>
              Show/Add Categories
            </button>
            <button className="user-button" onClick={this.handleShowHistory}>
              Show Game History
            </button>
            <button className="user-button" onClick={this.sendToCustomGame}>
              Create Custom Game
            </button>
            <button className="user-button" onClick={this.handleDeleteUser}>
              Delete User
            </button>
          </div>
          {this.state.userCreated.userQuestions && (
            <div className="user-categories-container">
              {this.state.showAdd && (
                <>
                  <div className="create-category-container">
                    <h1>Add Category:</h1>
                    <>
                      <CreateCategory
                        onSubmit={this.handleCategorySubmit}
                        onChange={this.handleChange}
                        category={this.state.userInput.category}
                      />
                    </>
                  </div>

                  {this.state.userCreated.userCategories.map((category, i) => (
                    <>
                      <h1>{category.category}</h1>
                      <CategoryDetails
                        question={this.state.userInput.question}
                        answer={this.state.userInput.answer}
                        categoryData={category}
                        questions={this.state.userCreated.userQuestions}
                        handleChange={this.handleChange}
                        handleQuestionSubmit={this.handleQuestionSubmit}
                        handleDeleteCategory={this.handleDeleteCategory}
                        handleDeleteQuestion={this.handleDeleteQuestion}
                      />
                    </>
                  ))}
                </>
              )}
            </div>
          )}
          {this.state.toggleShowHistory && (
            <div className="game-history-container">
              <h1>Game History:</h1>
              <>
                <DisplayGameHistory />
              </>
            </div>
          )}
        </div>
      </>
    );
  }
}
export default withRouter(UserProfilePage);
