import React from "react";

export default props => {
  return (
    <div className="logout-container">
      <h2>Log-out</h2>
      <form>
        <button type="submit" onClick={props.handleLogout}>
          Log-out
        </button>
        <button type="submit" onClick={() => this.props.history.push(`/home`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};
