import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  const { show, userData } = props;
  return (
    <div className="footer">
      <Link to="/">HOME</Link>
      {show ? (
        <>
          <Link
            className="link"
            to={"/user/" + userData.id + "/username/" + userData.username}
          >
            PROFILE
          </Link>
          <Link className="link" to="/logout">
            LOGOUT
          </Link>
        </>
      ) : (
        <Link className="link" to="/login">
          LOGIN
        </Link>
      )}
      <Link className="link" to="/contact">
        CONTACT
      </Link>
      <a href="https://github.com/kdabug">github</a>
    </div>
  );
};
export default Footer;
