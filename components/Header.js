// src/components/Header.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  // 1) Тема из localStorage или light по умолчанию
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2) При каждом изменении темы — пишем в <html> и в localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3) Переключатель темы
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-left">
          <h1 className="navbar-logo">MyMovies</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas fa-${theme === "dark" ? "sun" : "moon"}`}></i>
          </button>
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Watchlist
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add" className="nav-link" activeClassName="active">
              Add
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/watched"
              className="nav-link"
              activeClassName="active"
            >
              Watched
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
