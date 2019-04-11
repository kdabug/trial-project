"use strict";
import React from "react";
import { Route, Link, withRouter } from "react-router-dom";
import Loading from "./Loading";

const TitlePage = props => {
  const { gameData, userdata, currentUser } = props;
  console.log("this is titlepage props", props);
  return (
    <div className="layer">
      <div className="welcome-container">
        <div className="welcome-script">
          <h1 className="title"> Trial</h1>
          <p>guess the question from the answer</p>
          {gameData.questionData ? (
            <>
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
                      `/user/${userdata.id}/username/${userdata.username}`
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
            </>
          ) : (
            <>
              <Loading show="yes" />
              <Loading show="yes" />
              <Loading show="yes" />
              <Loading show="yes" />
              <Loading show="yes" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TitlePage);
