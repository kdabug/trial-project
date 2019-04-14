import React from "react";
import Countdown from "react-countdown-now";
import Modal from "./Modal";

export default props => {
  console.log("this is askquestion props", props);
  const { show, onChange, onSubmit, value, timer, clue, answer } = props;
  return (
    <>
      {show && (
        <Modal>
          <div className="ask-question-container modal">
            {/* <Countdown
              date={Date.now() + 50000}
              onComplete={e => onSubmit(e, value)}
            /> */}
            <h2 className="ask-question-header">Question</h2>
            <form className="ask-question-form" onSubmit={onSubmit}>
              <>
                <p>{clue.question}</p>
                <label htmlFor="question">Question: What is...</label>
                <input
                  type="text"
                  name="answer"
                  value={answer}
                  onChange={onChange}
                  placeholder="Jeopardy"
                  autocomplete="off"
                />
                <button type="submit" onClick={e => onSubmit(e, value)}>
                  Submit
                </button>
              </>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};
