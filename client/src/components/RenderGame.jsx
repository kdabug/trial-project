import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AskQuestion from "./AskQuestion";
import Loading from "./Loading";

class RenderGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10,
      currentClue: "",
      showQuestion: false
    };
    this.handleAskQuestion = this.handleAskQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
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
  handleSubmit(e) {
    e.preventDefault();
  }
  handleTileClick(e) {
    e.preventDefault();
  }
  handleAskQuestion(e) {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("handleAskQuestions", name, value);
    this.setState(prevState => ({
      showQuestion: !prevState.showQuestion,
      currentClue: name
    }));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gameData !== nextProps.gameData) {
      this.setState({ gameData: nextProps.gameData });
    }
  }

  async componentDidMount() {
    // const checkUser = await localStorage.getItem("jwt");
    // if (checkUser) {
    //   const user = decode(checkUser);
    //   console.log(
    //     "this is user ComponentDidMount on UserProfile Component",
    //     user
    //   );
    // }
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
                          className="question-information"
                          onClick={this.handleAskQuestion}
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
