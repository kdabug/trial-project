import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AskQuestion from "./AskQuestion";
import Loading from "./Loading";

class RenderGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10,
      currentClue: {},
      showQuestion: false,
      gameData: {},
      userInputData: {
        answer: ""
      }
    };
    this.handleAskQuestion = this.handleAskQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.backToBoard = this.backToBoard.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
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
  checkAnswer() {
    e.preventDefault();
  }
  backToBoard() {
    e.preventDefault();
  }

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
          {this.state.showQuestion && (
            <RightOrWrong
              score={this.state.currentClue}
              onSubmit={this.backToBoard}
              onChange={this.handleChange}
              answer={this.state.currentClue.answer}
            />
          )}
        </>
        <>
          {this.props.gameData ? (
            <>
              {!this.state.showQuestion && (
                <>
                  {this.props.gameData.questionData.map((category, index) => (
                    <>
                      <h1>{category.title}</h1>
                      {category.clues.map((clue, i) => (
                        <div
                          type="button"
                          className="question-information"
                          onClick={e => this.handleAskQuestion(e, clue)}
                          id={clue.id}
                          placeholder={clue.value}
                        >
                          {clue.value}
                        </div>
                      ))}
                    </>
                  ))}
                </>
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
