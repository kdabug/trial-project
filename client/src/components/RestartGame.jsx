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
            <div className="restart-container">
              <h2 className="restart-header">Game Finished</h2>
              <>
                <p>
                  Congratulations, your score of ${currentScore} will be
                  recorded in your game History.
                </p>
              </>
              <>
                <button
                  type="submit"
                  className="ask-question-button"
                  onClick={onSubmit}
                >
                  Restart Game
                </button>
              </>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
