import React from "react";
import Countdown from "react-countdown-now";

export default props => {
  console.log("this is askquestion props", props);
  return (
    <div className="ask-question-container">
      <Countdown date={Date.now() + props.timer} onComplete={props.onSubmit} />
      <h2 className="ask-question-header">Question</h2>
      <form className="ask-question-form" onSubmit={props.onSubmit}>
        <>
          <p>{props.clue.question}</p>
          <label htmlFor="question">Question: What is...</label>
          <input
            type="text"
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
