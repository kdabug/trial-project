import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AskQuestion from "./AskQuestion";

class RenderGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 10;
      currentClue: ''
    };
    this.getUsersQuestions = this.getUsersQuestions.bind(this);
    this.handleAskQuestionButton = this.handleAskQuestionButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSumbit.bind(this);
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
    const resp = await createNewQuestion(
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
  handleShowMoreButton(e) {
    e.preventDefault();
    this.setState(prevState => ({ showMore: !prevState.showMore }));
  }
  handleAskQuestion(e, clue) {
    e.preventDefault();
    this.setState(prevState => ({ showQuestion: !prevState.showQuestion }));
    
  }

  async getGameHistory() {
    const gameHistory = await getGameHistory();
    this.setState(prev);
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
      <div className="render-game-container">
        <>
          {showQuestion && (
            <AskQuestion
              clue={currentlue}
              timer={this.state.timer}
              onSubmit={this.checkAnswer}
              onChange={this.handleChange}
            />
          )}
        </>
        <>
          {questionData ? (
            <>
              {questionData.map((category, index) => (
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
