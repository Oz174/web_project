import React from "react";

/* ================== React router ==================*/
import { Link, NavLink } from "react-router-dom";

/* ================== used styles ==================*/
import style_ from "./Navbar.module.css";

export default function navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link className="navbar-brand" to="/MatchesDetails">
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
              <NavLink className="nav-link" to="/MatchesDetails">
                Matches Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/EditMatches">
                Edit Matches
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/AddStadium">
                Add Stadium
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/AddMatch">
                Add Match
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/VacantAndReservedSeats">
                Vacant And Reserved Seats
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/login">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
