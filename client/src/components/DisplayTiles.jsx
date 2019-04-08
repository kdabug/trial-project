import React from "react";
import { withRouter } from "react-router-dom";

const DisplayTiles = props => {
  const { questionData } = props;
  console.log("displayTiles: props.questionData", questionData);
  //   const createDate = time => {
  //     const date = new Date(time);
  //     return date.toLocaleString("en-US");
  //   };
  return (
    <div className="stock-list">
      {questionData &&
        questionData.map((category, index) => (
          <div className="category-container">
            <h1>{category.title}</h1>
            {category.map((question, i) => (
              <div className="question-information" onClick={onClick}>
                hi question
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
export default withRouter(CommentList);
