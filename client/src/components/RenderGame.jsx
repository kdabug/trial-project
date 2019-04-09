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
    this.getUsersQuestions = this.getUsersQuestions.bind(this);
    this.handleAskQuestionButton = this.handleAskQuestionButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSumbit.bind(this);
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
  async handleSubmit(e) {
    e.preventDefault();
  }
  handleTileClick(e) {
    e.preventDefault();
  }
  handleAskQuestion(e, clue) {
    e.preventDefault();
    this.setState(prevState => ({ showQuestion: !prevState.showQuestion }));
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
          {this.props.questionData ? (
            <>
              {this.props.questionData.map((category, index) => (
                <>
                  <h1>{category.title}</h1>

                  {category.map((clue, i) => (
                    <div
                      className="question-information"
                      onClick={() => this.handleAskQuestion(clue)}
                    >
                      {clue.value}
                    </div>
                  ))}
                </>
              ))}
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
