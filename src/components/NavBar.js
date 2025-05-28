// src/components/NavBar.js
import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-container container">
      <h1 className="navbar-logo">MyMovies</h1>
      <ul className="nav-links">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/watchlist"
            className="nav-link"
            activeClassName="active"
          >
            Watchlist
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
