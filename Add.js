// src/components/Add.js
import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
// — добавлен импорт motion для анимации появления страницы
import { motion } from "framer-motion";

// Skeleton-заглушка для показа при загрузке
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-poster"></div>
    <div className="skeleton-text-line short"></div>
    <div className="skeleton-text-line long"></div>
  </div>
);

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    setLoading(true);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
        value
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults(Array.isArray(data.results) ? data.results : []);
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  };

  return (
    // — обернули всю страницу в motion.div с initial/animate/exit для плавного появления
    <motion.div
      className="add-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero Banner с поиском */}
      <section className="search-hero">
        <div className="search-hero-bg" />
        <div className="search-hero-content container">
          <h2 className="search-hero-title">Find Your Next Movie</h2>
          <div className="search-box">
            <motion.i
              className="fas fa-search search-icon"
              // — легкий эффект при наведении на иконку
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            <input
              className="search-input"
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>
        </div>
      </section>

      {/* Результаты или Skeleton */}
      <div className="container">
        {loading ? (
          <div className="movie-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : Array.isArray(results) && results.length > 0 ? (
          <ul className="results movie-grid">
            {results.map((movie) => (
              <li key={movie.id}>
                <ResultCard movie={movie} />
              </li>
            ))}
          </ul>
        ) : (
          query && <h2 className="no-movies">No movies found!</h2>
        )}
      </div>
    </motion.div>
  );
};
