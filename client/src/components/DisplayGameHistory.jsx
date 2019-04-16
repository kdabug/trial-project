import React from "react";

export default props => (
  <div className="display-history-container">
    {props.gameData ? (
      props.gameData.map(el => (
        <div>
          <p>{el.created_at}</p>
          <p>{el.score}</p>
        </div>
      ))
    ) : (
      <></>
    )}
  </div>
);
