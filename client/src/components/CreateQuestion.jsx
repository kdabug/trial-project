import React from "react";

export default props => (
  <div className="create-question-container">
    <h2 className="create-question-header">Add Question</h2>
    <form className="create-question-form" onSubmit={props.onSubmit}>
      <>
        <label htmlFor="answer"> Answer: </label>
        <input
          type="text"
          name="answer"
          value={props.answer}
          onChange={props.onChange}
          placeholder="Ex: The gameshow hosted by Alec Trebek. "
        />
        <label htmlFor="question">Question: What is...</label>
        <input
          type="text"
          name="question"
          value={props.question}
          onChange={props.onChange}
          placeholder="Jeopardy"
        />
        <input type="hidden" value={props.categoryId} name="category_id" />
        <button type="submit" onClick={props.onSubmit}>
          Submit
        </button>
      </>
    </form>
  </div>
);
