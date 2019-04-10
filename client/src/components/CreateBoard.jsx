import React from "react";
import DisplayTiles from "./DisplayTiles";

export default props => {
  console.log("this is createBoard props", props);
  return (
    <div className="create-board-container">
      {props.questionData && (
        <>
          {props.questionData.map((category, index) => (
            <div className="category-column-container">
              <h1 key={index}>{category.title}</h1>
              {category.clues.map((clue, i) => (
                <>
                  <DisplayTiles
                    handleAskQuestion={props.handleAskQuestion}
                    value={i}
                    clue={clue}
                    round={props.round}
                  />
                </>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
