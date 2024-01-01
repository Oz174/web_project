import React from "react";

/* ================== React router ==================*/
import { Link, NavLink } from "react-router-dom";

/* ================== used styles ==================*/
import style_ from "./Navbar.module.css";

export default function navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <Link className="navbar-brand" to="/customer/match details">
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
            <li>
              <NavLink className="nav-link" to="/customer/match details">
                Matches Details
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/customer/vacant seats">
                Reserve Seat
              </NavLink>
            </li>
            {/* <li>
              <NavLink className="nav-link" to="/customer/Reserve Seat">
                Reserve Seat
              </NavLink>
            </li> */}
            <li>
              <NavLink className="nav-link" to="/customer/Cancel Reservation">
                Cancel Reservation
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink className="nav-link" to="/customer/EditData">
                Profile
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
