import React from "react";
import { Link } from "react-router-dom";
import { createCategory } from "../services/createCustomGameAPI";

const GameHeader = props => {
  const { show, userData, currentScore } = props;
  return (
    <>
      {show && (
        <div className="header">
          <div className="username">{userData.username}</div>
          <div className="currentscore">${currentScore}</div>
        </div>
      )}
    </>
  );
};
export default GameHeader;
