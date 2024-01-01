import React from "react";

/* ================== React router ==================*/
import { Link, NavLink } from "react-router-dom";

/* ================== used styles ==================*/
import style_ from "./Navbar.module.css";

export default function navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link className="navbar-brand" to="/Home">
          Egyptian League
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {/* <p>to reserve a ticket you shoud register</p> */}
    </>
  );
}
