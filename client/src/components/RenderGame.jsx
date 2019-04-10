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
      showQuestion: false,
      toggleAnswered: false,
      gameData: {},
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
      showQuestion: !prevState.showQuestion,
      currentClue: clue
    }));
  }
  checkAnswer(e) {
    e.preventDefault();
  }
  backToBoard(e) {
    e.preventDefault();
  }
  finalTrial() {}

  componentWillReceiveProps(nextProps) {
    if (this.props.gameData !== nextProps.gameData) {
      this.setState({ gameData: nextProps.gameData });
    }
  }

  async componentDidMount() {
    this.setState({ gameData: this.props.gameData });
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
          {this.state.showQuestion && (
            <AskQuestion
              clue={this.state.currentClue}
              timer={this.state.timer}
              onSubmit={this.checkAnswer}
              onChange={this.handleChange}
              answer={this.state.userInputData.answer}
            />
          )}
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
          {this.props.gameData ? (
            <>
              {!this.state.showQuestion && (
                <CreateBoard
                  questionData={this.props.gameData.questionData}
                  handleAskQuestion={this.handleAskQuestion}
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
