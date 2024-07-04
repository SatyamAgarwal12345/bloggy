import React from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark px-3 mb-3">
        <div className="navbar-header">
          <Link className="navbar-brand" to={"/view"}>
            Blog Portal
          </Link>
        </div>

        <ul className="navbar-nav ">
          <li className="nav-item">
            <Link className="nav-link" to={"/view"}>
              View Blog
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to={"/blogpost"}>
              Add Blog
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
