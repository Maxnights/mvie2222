// src/components/Header.js
import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import "{/* Здесь у вас, вероятно, подключается иконка темы, например: */}";
// import { ReactComponent as SunIcon } from "../assets/sun.svg";
// import { ReactComponent as MoonIcon } from "../assets/moon.svg";

export const Header = () => {
  const { theme, toggleTheme } = useContext(GlobalContext); 
  // Предположим, что у вас в контексте есть текущее состояние темы
  // и функция toggleTheme(), меняющая тему (light↔dark).

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Закрыть меню, если перешли по ссылке
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Левая часть: логотип → переключатель темы → гамбургер */}
        <div className="navbar-left">
          {/* 1) Ваш логотип */}
          <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
            MyMovies
          </Link>

          {/* 2) Кнопка переключения темы */}
          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              // если меню открыто, пусть остаётся открытым
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
            {/* Можно заменить на SVG-иконки: <SunIcon /> / <MoonIcon /> */}
          </button>

          {/* 3) Гамбургер */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Правая часть: обычные ссылки, но они будут скрыты на мобильных */}
        <ul className="nav-links">
          <li>
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              Watchlist
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className={`nav-link ${
                location.pathname === "/add" ? "active" : ""
              }`}
            >
              Add
            </Link>
          </li>
          <li>
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

        {/* 4) Выпадающее меню для мобильных, показывается только когда menuOpen=true */}
        <ul className={`nav-links-mobile ${menuOpen ? "open" : ""}`}>
          <li>
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
          <li>
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
          <li>
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
      </div>
    </header>
  );
};
