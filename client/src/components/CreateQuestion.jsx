import React from "react";

export default props => {
  console.log("this is create question props", props);
  return (
    <div className="create-question-container">
      <h2 className="create-question-header">Add Question</h2>
      <form className="create-question-form" onSubmit={props.onSubmit}>
        <>
          <label htmlFor="answer"> Clue: </label>
          <input
            type="text"
            name="question"
            value={props.question}
            onChange={props.onChange}
            placeholder="Ex: The gameshow hosted by Alec Trebek. "
          />
          <label htmlFor="question"> What is...</label>
          <input
            type="text"
            name="answer"
            value={props.answer}
            onChange={props.onChange}
            placeholder="Jeopardy"
          />
          <button
            type="submit"
            onClick={e => props.onSubmit(e, props.category_id)}
          >
            Submit
          </button>
        </>
      </form>
    </div>
  );
};
