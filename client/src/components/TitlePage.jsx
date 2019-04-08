"use strict";
import React from "react";
import { Route, Link, withRouter } from "react-router-dom";

const TitlePage = props => {
  const { userdata, currentUser } = props;
  return (
    <div className="layer">
      <div className="welcome-container">
        <div className="welcome-script">
          <h1 className="title"> Trial</h1>
          <button
            className="title-button"
            onClick={() => props.history.push("/play")}
          >
            play
          </button>
          {currentUser ? (
            <button
              className="title-button"
              onClick={() =>
                props.history.push(
                  `/user/${userdata.id}/username/${userdata.name}`
                )
              }
            >
              create
            </button>
          ) : (
            <button
              className="title-button"
              onClick={() => props.history.push(`/login`)}
            >
              create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TitlePage);
