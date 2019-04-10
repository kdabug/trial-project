import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
      gameTimer: 1800,
      quesitonTimer: 10,
      currentClue: {},
      currentValue: 0,
      toggleShowQuestion: false,
      toggleAnswered: false,
      toggleFinalTrial: false,
      toggleSecondRound: true,
      roundOne: "",
      roundTwo: "",
      gameData: this.props.gameData,
      userInputData: {
        answer: ""
      },
      currentScore: 0
    };
    this.handleAskQuestion = this.handleAskQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.backToBoard = this.backToBoard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.finalTrial = this.finalTrial.bind(this);
    this.setRoundData = this.setRoundData.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      userInputData: {
        ...prevState.userInputData,
        [name]: value
      }
    }));
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleTileClick(e) {
    e.preventDefault();
  }
  handleAskQuestion(e, clue) {
    e.preventDefault();
    const { id } = e.target;
    console.log("handleAskQuestions", id);
    this.setState(prevState => ({
      toggleShowQuestion: !prevState.toggleShowQuestion,
      currentClue: clue,
      currentValue: clue.id
    }));
  }
  checkAnswer(e) {
    e.preventDefault();
  }
  backToBoard(e) {
    e.preventDefault();
    this.setState(prevState => ({
      toggleShowQuestion: false,
      toggleAnswered: false,
      toggleFinalTrial: false
    }));
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
  goToRoundTwo() {
    this.setState(prevState => ({
      gameData: this.state.roundTwo,
      toggleSecondRound: !prevState.toggleSecondRound
    }));
  }
  setRoundData() {
    const roundOne = this.props.gameData.questionData.splice(0, 5);
    const roundTwo = this.props.gameData.questionData.splice(0, 5);
    console.log("this is round1", roundOne);
    console.log("this is round2", roundTwo);
    this.setState((prevState, nextState) => ({
      roundOne,
      roundTwo
    }));
    console.log("this is renderprops cdm state", this.state);
  }

  async componentDidMount() {
    this.setRoundData();
  }

  render() {
    console.log("this is renderGame props", this.props);
    return (
      <div className="render-game-container">
        <Countdown
          date={Date.now() + this.state.gameTimer}
          onComplete={this.finalTrial}
        />
        <>
          {this.state.toggleShowQuestion && (
            <AskQuestion
              clue={this.state.currentClue}
              value={this.state.currentValue}
              timer={this.state.timer}
              onSubmit={this.checkAnswer}
              onChange={this.handleChange}
              answer={this.state.userInputData.answer}
            />
          )}
          <>
            {this.state.toggleFinalTrial && (
              <FinalTrial
                value={this.state.wager}
                onSubmit={this.sendToFinalQuestion}
                onChange={this.handleChange}
                currentScore={this.state.userInputData.currentScore}
              />
            )}
          </>
        </>
        <>
          {this.state.toggleAnswered && (
            <RightOrWrong
              score={this.state.currentClue}
              onSubmit={this.backToBoard}
              answer={this.state.currentClue.answer}
            />
          )}
        </>
        <>
          {this.state.roundOne ? (
            <>
              {!this.state.toggleSecondRound ? (
                <CreateBoard
                  questionData={this.state.roundOne}
                  handleAskQuestion={this.handleAskQuestion}
                  round={1}
                />
              ) : (
                <CreateBoard
                  questionData={this.state.roundTwo}
                  handleAskQuestion={this.handleAskQuestion}
                  round={2}
                />
              )}
            </>
          ) : (
            <Loading show="yes" />
          )}
        </>
      </div>
    );
  }
}
export default withRouter(RenderGame);
