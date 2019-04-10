import React from "react";
import DisplayTiles from "./DisplayTiles";

export default props => (
  <div className="create-board-container">
    {props.questionData && (
      <>
        {props.questionData.map((category, index) => (
          <>
            <h1 key={index}>{category.title}</h1>
            {category.clues.map((clue, i) => (
              <>
                <DisplayTiles
                  handleAskQuestion={props.handleAskQuestion}
                  value={i}
                  clue={clue}
                />
              </>
            ))}
          </>
        ))}
      </>
    )}
  </div>
);
