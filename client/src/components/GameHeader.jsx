import React from "react";
import { Link } from "react-router-dom";
import { createCategory } from "../services/createCustomGameAPI";

const GameHeader = props => {
  const { show, userData } = props;
  return (
    <>
      {show && (
        <div className="header">
          <nav>
            <Link to="/">Trial</Link>
          </nav>
        </div>
      )}
    </>
  );
};
export default GameHeader;
