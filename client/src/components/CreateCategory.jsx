import React from "react";

export default props => (
  <div className="create-category-container">
    <h2 className="create-category-header">Add Question</h2>
    <form className="create-category-form" onSubmit={props.onSubmit}>
      <>
        <label htmlFor="answer"> Category: </label>
        <input
          type="text"
          name="category"
          value={props.category}
          onChange={props.onChange}
          placeholder="Ex: the eyes have it "
        />
        <button type="submit" onClick={props.onSubmit}>
          Submit Category
        </button>
      </>
    </form>
  </div>
);
