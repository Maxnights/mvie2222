// src/components/Header.js
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  // Текущая тема (light|dark) из localStorage или 'light' по умолчанию
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  // Состояние, открыто ли мобильное меню
  const [isOpen, setIsOpen] = useState(false);

  // При изменении темы — устанавливаем атрибут data-theme и в localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Переключатель темы
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Обработчик клика на гамбургер: показывает/скрывает мобильное меню
  const toggleMobileMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // При клике на любую ссылку мобильного меню — сразу закрываем его
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* Левый блок: логотип, переключатель темы, гамбургер */}
        <div className="navbar-left">
          <h1 className="navbar-logo">MyMovies</h1>

          {/* Кнопка переключения темы */}
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fas fa-${theme === "dark" ? "sun" : "moon"}`}></i>
          </button>

          {/* Кнопка-гамбургер (будет видна только на экранах ≤640px) */}
          <button
            className={`hamburger${isOpen ? " open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {/* Три полоски, которые превращаются в крестик при isOpen */}
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Desktop-меню (автоматически скрывается стилями при ≤640px) */}
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

        {/* Мобильное меню: показывает ссылки в колонку, когда isOpen === true */}
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
