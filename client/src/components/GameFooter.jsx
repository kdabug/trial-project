import React from "react";
import { Link } from "react-router-dom";

const GameFooter = props => {
  const { show, userData } = props;
  return (
    <div className="footer">
      <Link to="/">HOME</Link>
      {show ? (
        <>
          <Link to={"/user/" + userData.id + "/username/" + userData.username}>
            PROFILE
          </Link>
          <Link to="/logout">LOGOUT</Link>
        </>
      ) : (
        <Link to="/login">LOGIN</Link>
      )}
      <Link to="/contact">CONTACT</Link>
      <a href="https://github.com/kdabug/trial-project/blob/master/flow_images/wireframe.jpg">
        github
      </a>
    </div>
  );
};
export default GameFooter;
