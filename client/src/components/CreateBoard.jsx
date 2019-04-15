import React from "react";
import DisplayTiles from "./DisplayTiles";
import Countdown from "react-countdown-now";

export default props => {
  console.log("this is createBoard props", props);
  const { questionData, handleAskQuestion, timer, round, toggleRound } = props;
  return (
    <div className="create-board-container">
      <Countdown date={Date.now() + timer} onComplete={toggleRound} />
      <>
        <div>
          <h1 className="create-board-game-title"> TRIALS ROUND {round}</h1>
        </div>
        {questionData.map((category, index) => (
          <div className="category-column-container">
            <div className="category-title-container">
              <h1 key={index}>{category.title}</h1>
            </div>
            {category.clues.map((clue, i) => {
              if (i < 5)
                return (
                  <DisplayTiles
                    handleAskQuestion={handleAskQuestion}
                    value={(i + 1) * round}
                    clue={clue}
                    round={round}
                  />
                );
            })}
          </div>
        ))}
      </>
    </div>
  );
};
