import React from "react";

export default props => {
  console.log("this is right-or-wrong props", props);
  const { right, score, answer } = props;
  return (
    <div className="right-or-wrong-container">
      {right ? (
        <h2 className="right-or-wrong-header">
          You're Right - Your score is now {score}
        </h2>
      ) : (
        <h2 className="right-or-wrong-header">
          Sorry - wrong answer. The answer is {answer}. Your score is {score}
        </h2>
      )}
      <button type="submit" onClick={props.onSubmit}>
        Submit
      </button>
    </div>
  );
};
