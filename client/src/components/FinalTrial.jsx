import React from "react";

export default props => {
  console.log("this is finalquestion props", props);
  const { show, onSubmit, onChange, currentScore, answer } = props;
  return (
    <>
      {show && (
        <div className="final-question-container">
          <h2 className="final-question-header">THIS IS YOUR FINAL TRIAL</h2>
          <h3 className="final-question-header">
            YOU CAN BET UP TO ${currentScore}
          </h3>
          <form className="final-question-form" onSubmit={onSubmit}>
            <>
              <input
                type="integer"
                name="answer"
                value={answer}
                onChange={onChange}
                placeholder="Jeopardy"
                autocomplete="off"
              />
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
            </>
          </form>
        </div>
      )}
    </>
  );
};
