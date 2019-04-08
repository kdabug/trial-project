import React from "react";
import { Link } from "react-router-dom";

const Header = props => {
  const { show, userData } = props;
  return (
    show && (
      <div className="header">
        <nav>
          <Link to="/">Trial</Link>
        </nav>
      </div>
    )
  );
};
export default Header;
