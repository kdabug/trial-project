import React from "react";
import Modal from "./Modal";

export default props => {
  console.log("this is askquestion props", props);
  const { show, onChange, onSubmit, clue, answer } = props;
  return (
    <>
      {show && (
        <Modal>
          <div className="modal">
            <div className="ask-question-container">
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
                  <button
                    type="submit"
                    className="ask-question-button"
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
