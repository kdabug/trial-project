import React, { Component } from "react";
import CreateQuestion from "./CreateQuestion";

export default class CategoryDetails extends Component {
  constructor() {
    super();
    this.state = {
      showMore: false,
      showAdd: false
    };
    this.handleShowMoreButton = this.handleShowMoreButton.bind(this);
    this.handleAddQuestionButton = this.handleAddQuestionButton.bind(this);
  }

  handleShowMoreButton(e) {
    e.preventDefault();
    this.setState(prevState => ({ showMore: !prevState.showMore }));
  }
  handleAddQuestionButton(e) {
    e.preventDefault();
    this.setState(prevState => ({ showAdd: !prevState.showAdd }));
  }

  render() {
    const {
      categoryData,
      questions,
      handleDeleteCategory,
      handleDeleteQuestion,
      handleChange,
      handleQuestionSubmit,
      question,
      answer
    } = this.props;
    const { showMore, showAdd } = this.state;
    const clues = questions.filter(el => el.category_id === categoryData.id);
    //console.log("all the categoryDetails", categoryData, questions);
    return (
      <div className="category-detail-container">
        <h2>{categoryData.category}</h2>
        <button className="pretty-button" onClick={this.handleShowMoreButton}>
          {showMore ? "Show Less" : "Show Clues"}
        </button>
        <button
          className="pretty-button"
          onClick={e => handleDeleteCategory(e, categoryData.id)}
        >
          Delete Category
        </button>
        <>
          {showAdd && (
            <>
              <CreateQuestion
                category_id={categoryData.id}
                onChange={handleChange}
                onSubmit={handleQuestionSubmit}
                question={question}
                answer={answer}
              />
            </>
          )}
          {questions && showMore && (
            <>
              {clues.map((clue, i) => (
                <div className="more-details" key={i}>
                  <h3>Answer: {clue.question}</h3>
                  <h3>Question: {clue.answer}</h3>
                  <button
                    className="question-button"
                    key={i}
                    onClick={e => handleDeleteQuestion(e, clue.id)}
                  >
                    Delete Question
                  </button>
                </div>
              ))}
              <button
                className="pretty-button"
                onClick={this.handleAddQuestionButton}
              >
                {showAdd ? "Hide Form" : "Add Question"}
              </button>
            </>
          )}
        </>
      </div>
    );
  }
}
