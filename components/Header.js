// src/components/Header.js
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

export const Header = () => {
  // Предполагается, что в GlobalContext есть:
  //   theme       — текущая тема ("light" или "dark")
  //   toggleTheme — функция для переключения темы
  const { theme, toggleTheme } = useContext(GlobalContext);

  // Состояние мобильного меню
  const [menuOpen, setMenuOpen] = useState(false);
  // Чтобы подсветить активную ссылку
  const location = useLocation();

  // Закрываем меню при переходе по ссылке
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container container">
        {/* Левый блок: логотип → переключатель темы → гамбургер */}
        <div className="navbar-left">
          {/* 1) Логотип */}
          <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
            MyMovies
          </Link>

          {/* 2) Кнопка переключения темы */}
          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              // не закрываем меню при переключении темы
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* 3) Кнопка-гамбургер (появляется на мобильных) */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {/* Три полоски */}
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Правый блок: десктопное меню (скрывается на мобильных) */}
        <ul className="nav-links">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Watchlist
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/add"
              className={`nav-link ${
                location.pathname === "/add" ? "active" : ""
              }`}
            >
              Add
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/watched"
              className={`nav-link ${
                location.pathname === "/watched" ? "active" : ""
              }`}
            >
              Watched
            </Link>
          </li>
        </ul>

        {/* Мобильное выпадающее меню (появляется, когда menuOpen === true) */}
        {menuOpen && (
          <ul className="nav-links-mobile">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link-mobile ${
                  location.pathname === "/" ? "active" : ""
                }`}
                onClick={handleLinkClick}
              >
                Watchlist
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/add"
                className={`nav-link-mobile ${
                  location.pathname === "/add" ? "active" : ""
                }`}
                onClick={handleLinkClick}
              >
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/watched"
                className={`nav-link-mobile ${
                  location.pathname === "/watched" ? "active" : ""
                }`}
                onClick={handleLinkClick}
              >
                Watched
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};
