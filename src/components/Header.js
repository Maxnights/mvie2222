// src/components/Header.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  // Получаем тему из localStorage (или "light", если там ничего нет)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  // Состояние открытия/закрытия мобильного меню
  const [isOpen, setIsOpen] = useState(false);

  // При каждом изменении `theme` меняем data-атрибут у <html> и сохраняем в localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Переключаем тему
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Открываем/закрываем мобильное меню
  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // По клику на любую ссылку мобильного меню сразу зарываем его
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* Левый блок шапки: логотип, кнопка темы, гамбургер */}
        <div className="navbar-left">
          <h1 className="navbar-logo">MyMovies</h1>

          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas fa-${theme === "dark" ? "sun" : "moon"}`}></i>
          </button>

          <button
            className={`hamburger${isOpen ? " open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Десктоп-меню: автоматически скрывается в мобильном (≤640px) */}
        <ul className="nav-links">
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              className="nav-link"
              activeClassName="active"
            >
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

        {/* Мобильное меню: выезжает, когда isOpen=true */}
        <ul className={`nav-links-mobile${isOpen ? " open" : ""}`}>
          <li>
            <NavLink
              exact
              to="/"
              className="nav-link-mobile"
              activeClassName="active"
              onClick={handleMobileLinkClick}
            >
              Watchlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              className="nav-link-mobile"
              activeClassName="active"
              onClick={handleMobileLinkClick}
            >
              Add
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/watched"
              className="nav-link-mobile"
              activeClassName="active"
              onClick={handleMobileLinkClick}
            >
              Watched
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
