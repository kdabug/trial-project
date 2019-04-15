import React, { Component } from "react";
import { withRouter, Prompt } from "react-router-dom";
import AskQuestion from "./AskQuestion";
import Loading from "./Loading";
import RightOrWrong from "./RightOrWrong";
import FinalTrial from "./FinalTrial";
import Countdown from "react-countdown-now";
import CreateBoard from "./CreateBoard";

class RenderGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTimer: 900000,
      quesitonTimer: 10,
      currentClue: {},
      currentValue: 0,
      toggleShowQuestion: false,
      toggleShowFinalQuestion: false,
      toggleAnswered: false,
      toggleFinalTrial: false,
      toggleSecondRound: false,
      toggleEndGame: false,
      toggleRestart: false,
      roundOne: "",
      roundTwo: "",
      finalQuestion: {},
      gameData: this.props.gameData,
      userInput: {
        answer: "",
        wager: 0
      },
      questionCount: 0,
      currentScore: 0,
      compResponse: "",
      isBlocking: false
    };
    this.handleAskQuestion = this.handleAskQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.backToBoard = this.backToBoard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.finalTrial = this.finalTrial.bind(this);
    this.setRoundData = this.setRoundData.bind(this);
    this.goToSecondRound = this.goToSecondRound.bind(this);
    this.sendToFinalQuestion = this.sendToFinalQuestion.bind(this);
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

  handleAskQuestion(e, clue, value) {
    e.preventDefault();
    const { id } = e.target;
    console.log("handleAskQuestions", id);
    this.setState(prevState => ({
      toggleShowQuestion: !prevState.toggleShowQuestion,
      currentClue: clue,
      currentValue: value,
      questionCount: prevState.questionCount + 1,
      isBlocking: true
    }));
  }
  checkAnswer(e) {
    e.preventDefault();
    const { userInput, currentScore, currentClue, currentValue } = this.state;
    const userAnswer = userInput.answer.toLowerCase();
    const right =
      userAnswer.includes(currentClue.answer.toLowerCase()) ||
      currentClue.answer.toLowerCase().includes(userAnswer);
    console.log("checkAnswer currentScore and value", currentScore, value);
    const newScore = right
      ? currentScore + currentValue
      : currentScore - currentValue;
    console.log("this is checkAnswer right", right);
    this.setState(prevState => ({
      userInput: {
        answer: ""
      },
      compResponse: right,
      toggleShowQuestion: false,
      toggleShowFinalQuestion: false,
      toggleAnswered: true,
      currentScore: newScore
    }));
  }

  checkFinalAnswer(e) {
    this.checkAnswer(e);
    this.setState(prevState => ({
      toggleEndGame: !prevState.toggleEndGame
    }));
  }
  backToBoard(e) {
    e.preventDefault();
    this.setState(prevState => ({
      toggleShowQuestion: false,
      toggleAnswered: false,
      toggleFinalTrial: false
    }));
    if (this.state.toggleEndGame) {
      this.setState(prevState => ({
        toggleRestart: !prevState.toggleRestart
      }));
    }
  }
  finalTrial() {
    this.setState(prevState => ({
      toggleShowQuestion: false,
      toggleAnswered: false,
      toggleFinalTrial: !prevState.toggleFinalTrial
    }));
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.gameData !== nextProps.gameData) {
  //     this.setState({ gameData: nextProps.gameData });
  //   }
  // }
  goToSecondRound() {
    this.setState(prevState => ({
      gameData: this.state.roundTwo,
      toggleSecondRound: !prevState.toggleSecondRound,
      questionCounter: 0
    }));
  }

  async handleEndGame() {
    this.setState(prevState => ({
      isBlocking: false
    }));
    const endScoreSubmit = await this.props.handleEndGame(
      this.state.currentScore
    );
  }

  sendToFinalQuestion() {
    this.setState(prevState => ({
      toggleShowFinalQuestion: !prevState.toggleShowFinalQuestion,
      currentClue: this.state.finalQuestion,
      currentValue: this.state.wager
    }));
  }

  setRoundData() {
    const roundOne = this.props.gameData.questionData.splice(0, 5);
    const roundTwo = this.props.gameData.questionData.splice(0, 5);
    const finalQuestion = this.props.gameData.finalQuestion;
    console.log("this is round1", roundOne);
    console.log("this is round2", roundTwo);
    this.setState((prevState, nextState) => ({
      roundOne,
      roundTwo,
      finalQuestion
    }));
    console.log("this is renderprops cdm state", this.state);
  }

  async componentDidMount() {
    this.setRoundData();
  }

  async componentWillUnmount() {}

  render() {
    console.log("this is renderGame props", this.props);
    return (
      <div className="render-game-container">
        <Prompt
          when={this.state.currentScore && this.state.isBlocking}
          message={`Are you sure you want to go to leave this page and lose your current score?`}
        />
        <>
          <AskQuestion
            clue={this.state.currentClue}
            timer={this.state.timer}
            onSubmit={this.checkAnswer}
            onChange={this.handleChange}
            answer={this.state.userInput.answer}
            show={this.state.toggleShowQuestion}
          />
          <FinalTrial
            wager={this.state.wager}
            onSubmit={this.sendToFinalQuestion}
            onChange={this.handleChange}
            currentScore={this.state.userInput.currentScore}
            show={this.state.toggleFinalTrial}
          />
          <AskQuestion
            clue={this.state.currentClue}
            timer={this.state.timer}
            onSubmit={this.checkFinalAnswer}
            onChange={this.handleChange}
            answer={this.state.userInput.answer}
            show={this.state.toggleShowFinalQuestion}
          />
          <RightOrWrong
            right={this.state.compResponse}
            score={this.state.currentScore}
            onSubmit={this.backToBoard}
            answer={this.state.currentClue.answer}
            show={this.state.toggleAnswered}
          />
          <RestartGame
            show={this.state.toggleRestart}
            submitGame={this.handleEndGame}
            currentScore={this.state.currentScore}
          />
        </>
        <>
          {this.state.roundOne ? (
            this.state.toggleSecondRound || this.state.questionCount === 30 ? (
              <CreateBoard
                questionData={this.state.roundTwo}
                handleAskQuestion={this.handleAskQuestion}
                round={2}
                toggleRound={this.finalTrial}
                currentScore={this.state.currentScore}
                timer={this.state.gameTimer}
              />
            ) : (
              <CreateBoard
                questionData={this.state.roundOne}
                handleAskQuestion={this.handleAskQuestion}
                round={1}
                toggleRound={this.goToSecondRound}
                currentScore={this.state.currentScore}
                timer={this.state.gameTimer}
              />
            )
          ) : (
            <Loading show="yes" />
          )}
        </>
      </div>
    );
  }
}
export default withRouter(RenderGame);
