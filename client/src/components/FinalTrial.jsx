import React from "react";
import Modal from "./Modal";

export default props => {
  console.log("this is finalquestion props", props);
  const { show, onSubmit, onChange, currentScore, wager } = props;
  return (
    <>
      <Modal>
        {show && (
          <div className="modal">
            <div className="final-question-container">
              <h2 className="final-question-header">
                THIS IS YOUR FINAL TRIAL
              </h2>
              <h3 className="final-question-header">
                YOU CAN BET UP TO ${currentScore}
              </h3>
              <form className="final-question-form" onSubmit={onSubmit}>
                <>
                  <input
                    type="integer"
                    name="wager"
                    value={wager}
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
          </div>
        )}
      </Modal>
    </>
  );
};
