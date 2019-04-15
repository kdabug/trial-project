import React from "react";
import Modal from "./Modal";

export default props => {
  console.log("this is finalquestion props", props);
  const { show, onSubmit, onChange, currentScore, wager, submitGame } = props;
  return (
    <>
      <Modal>
        {show && (
          <div className="modal">
            <div className="final-question-container">
              {currentScore > 0 ? (
                <>
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
                </>
              ) : (
                <>
                  <h2 className="restart-header">Game Finished</h2>
                  <>
                    <p>
                      You ended with a score of ${currentScore}. You have no
                      money to wager.
                    </p>
                  </>
                  <>
                    <button
                      type="submit"
                      className="ask-question-button"
                      onClick={submitGame}
                    >
                      Restart Game
                    </button>
                  </>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
