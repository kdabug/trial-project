import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import TitlePage from "./components/TitlePage";
import GameHeader from "./components/GameHeader";
import {
  fetchUserData,
  updateUser,
  registerUser,
  loginUser,
  verifyToken
} from "./services/usersAPI";
import decode from "jwt-decode";
import "./App.css";
import { getBoards, getRandom } from "./services/jeopardyAPI";
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import LogoutForm from "./components/LogoutForm";
import Loading from "./components/Loading";
import UserProfilePage from "./components/UserProfilePage";
import Contact from "./components/Contact";
import RenderGame from "./components/RenderGame";
import AskQuestion from "./components/AskQuestion";
import GameFooter from "./components/GameFooter";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerFormData: {
        username: "",
        email: "",
        password: "",
        avatar_id: "",
        total_score: ""
      },
      currentUser: null,
      toggleLogin: true,
      loginFormData: {
        email: "",
        password: ""
      },
      token: "",
      userData: {},
      currentScore: "",
      gameData: {
        currentScore: 0
      }
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleEditFormChange = this.handleEditFormChange.bind(this);
    this.handleUserFormChange = this.handleUserFormChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.startGameData = this.startGameData.bind(this);
    // this.restartGame = this.restartGame.bind(this);
  }

  async fetchUserData() {
    console.log(
      "this is getting localsotragetoke",
      localStorage.getItem("token")
    );
    const userData = await fetchUserData();
    console.log("userdata from fetchUserData", userData);

    this.setState({
      currentUser: userData,
      userData: userData,
      loginFormData: {
        email: "",
        password: ""
      }
    });
    this.props.history.push(`/`);
  }

  async handleLogin(e) {
    e.preventDefault();
    const userData = await loginUser(this.state.loginFormData);

    this.setState({
      userData: userData.user
    });
    this.fetchUserData();
    this.props.history.push(`/`);
  }

  handleLoginClick(e) {
    e.preventDefault();
    console.log(
      "I want to register: handleLoginClick button",
      this.state.toggleLogin
    );
    this.setState((prevState, newState) => ({
      toggleLogin: !prevState.toggleLogin
    }));
  }

  async handleRegister(e) {
    e.preventDefault();
    const userData = await registerUser(this.state.registerFormData);
    this.setState((prevState, newState) => ({
      currentUser: userData.user.username,
      userData: userData.user,
      token: userData.token,
      registerFormData: {
        username: "",
        email: "",
        password: "",
        avatar_id: ""
      }
    }));
    localStorage.setItem("token", userData.token);
    this.props.history.push(`/`);
  }

  async handleEdit(e) {
    e.preventDefault();
    const userData = await updateUser(
      this.state.userData.id,
      this.state.userData
    );
    console.log("resp userData from handleEdit", userData);
    // this.setState((prevState, newState) => ({
    //   currentUser: userData.data.user.username,
    //   userData: userData.data.user
    // }));
    this.props.history.push(
      `/user/${this.state.userData.id}/username/${this.state.userData.username}`
    );
  }

  async handleLogout() {
    localStorage.removeItem("token");
    this.setState({
      currentUser: null,
      toggleLogin: true
    });
    this.props.history.push(`/`);
  }

  async handleEndGame() {}

  handleLoginFormChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }
  handleUserFormChange(e) {
    const { name, value } = e.target;
    console.log("handleRegisterChange name, val", name, value);
    this.setState(prevState => ({
      registerFormData: {
        ...prevState.registerFormData,
        [name]: value
      }
    }));
  }
  handleEditFormChange(e) {
    const { name, value } = e.target;
    console.log("handleEditChange name, val", name, value);
    this.setState(prevState => ({
      userData: {
        ...prevState.userData,
        [name]: value
      }
    }));
  }

  async startGameData() {
    const questionData = await getBoards();
    const finalTrial = await getRandom();
    this.setState((prevState, newState) => ({
      gameData: {
        questionData: questionData,
        finalTrial: finalTrial,
        currentScore: 0
      }
    }));
    console.log("startGameData gameData", this.state.gameData);
  }

  // async restartGame() {
  //   await this.getQuestionData();
  // }

  async componentDidMount() {
    await this.startGameData();
    const checkUser = localStorage.getItem("token");
    const currentUser = await verifyToken();
    console.log("this is app.js cdm checkuser", checkUser);
    if (checkUser) {
      const userData = decode(checkUser);
      console.log("this is app.js cdm userData", userData);
      this.setState((prevState, newState) => ({
        currentUser: currentUser,
        token: checkUser,
        userData: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          avatar_id: userData.avatar,
          total_score: userData.total_score
        }
      }));
    }
    console.log("this is gameData cdm app.js", this.state.gameData);
  }

  render() {
    return (
      <div className="Main-app-body">
        <GameHeader show={true} />
        <Route
          exact
          path="/"
          render={props => (
            <TitlePage
              {...props}
              gameData={this.state.gameData}
              currentUser={this.state.currentUser}
              userdata={this.state.userData}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <>
              <LoginForm
                {...props}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleLoginFormChange}
                onSubmit={this.handleLogin}
                email={this.state.loginFormData.email}
                password={this.state.loginFormData.password}
                onClick={this.handleLoginClick}
              />
              <UserForm
                {...props}
                userData={""}
                title={"Register User"}
                onClick={this.handleLoginClick}
                show={this.state.currentUser}
                toggle={this.state.toggleLogin}
                onChange={this.handleUserFormChange}
                onSubmit={this.handleRegister}
                username={this.state.registerFormData.username}
                email={this.state.registerFormData.email}
                avatar={this.state.registerFormData.avatar}
                password={this.state.registerFormData.password}
                submitButtonText="Submit"
                backButtonText="Back to Login"
                passwordAsk={"y"}
              />
              <Loading show={this.state.currentUser} />
            </>
          )}
        />
        <Route
          path="/user/:id/edit"
          render={props => (
            <UserForm
              {...props}
              title={"Edit User"}
              userData={this.state.userData}
              onChange={this.handleEditFormChange}
              onSubmit={this.handleEdit}
              username={this.state.userData.username}
              email={this.state.userData.email}
              password={this.state.userData.password}
              avatar={this.state.userData.avatar}
              submitButtonText={"Submit"}
              backButtonText={"Cancel (Back to User)"}
              toggle={""}
              onClick={() =>
                this.props.history.push(
                  `/user/${this.state.userData.id}/username/${
                    this.state.userData.username
                  }`
                )
              }
              show={""}
              passwordAsk={""}
            />
          )}
        />
        <Route
          exact
          path="/user/:id/username/:username"
          render={props => (
            <UserProfilePage {...props} userData={this.state.userData} />
          )}
        />
        <Route exact path="/contact" render={() => <Contact />} />
        <Route
          exact
          path="/logout"
          render={props => (
            <LogoutForm {...props} handleLogout={this.handleLogout} />
          )}
        />
        <Route
          path="/play"
          render={props => (
            <>
              <RenderGame
                {...props}
                currentScore={this.state.currentScore}
                gameData={this.state.gameData}
              />
            </>
          )}
        />
        <GameFooter
          show={this.state.currentUser}
          userData={this.state.userData}
        />
      </div>
    );
  }
}

export default withRouter(App);
