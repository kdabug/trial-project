import React from "react";

export default props => {
  console.log("this is finalquestion props", props);
  return (
    <div className="final-question-container">
      <h2 className="final-question-header">Final Trial</h2>
      <form className="final-question-form" onSubmit={props.onSubmit}>
        <>
          <p>{props.clue.question}</p>
          <label htmlFor="question">Question: What is...</label>
          <input
            type="text"
            name="answer"
            value={props.answer}
            onChange={props.onChange}
            placeholder="Jeopardy"
          />
          <button type="submit" onClick={props.onSubmit}>
            Submit
          </button>
        </>
      </form>
    </div>
  );
};
