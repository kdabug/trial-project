import React from "react";
import Modal from "./Modal";

export default props => {
  console.log("this is right-or-wrong props", props);
  const { right, score, answer, show } = props;
  const style = {
    width: "30%",
    margin: "0 auto"
  };
  return (
    <>
      <Modal>
        {show && (
          <div className="modal">
            <div className="right-or-wrong-container">
              {right ? (
                <h2 className="right-or-wrong-header">
                  You're Right - Your score is now ${score}
                </h2>
              ) : (
                <h2 className="right-or-wrong-header">
                  Sorry - wrong answer. The answer is {answer}. <br /> Your
                  score is $ {score}
                </h2>
              )}
              <button
                type="submit"
                className="pretty-button"
                style={style}
                onClick={props.onSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
