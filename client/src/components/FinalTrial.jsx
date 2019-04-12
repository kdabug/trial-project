import React from "react";

export default props => {
  console.log("this is finalquestion props", props);
  return (
    <div className="final-question-container">
      <h2 className="final-question-header">THIS IS YOUR FINAL TRIAL</h2>
      <h3 className="final-question-header">
        YOU CAN BET UP TO ${props.currentScore}
      </h3>
      <form className="final-question-form" onSubmit={props.onSubmit}>
        <>
          <input
            type="integer"
            name="answer"
            value={props.answer}
            onChange={props.onChange}
            placeholder="Jeopardy"
            autocomplete="off"
          />
          <button type="submit" onClick={props.onSubmit}>
            Submit
          </button>
        </>
      </form>
    </div>
  );
};
