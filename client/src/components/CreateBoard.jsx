import React from "react";
import DisplayTiles from "./DisplayTiles";

export default props => {
  console.log("this is createBoard props", props);
  const { questionData, handleAskQuestion, round } = props;
  return (
    <div className="create-board-container">
      <>
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
                    value={i}
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
