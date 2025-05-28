// src/components/Add.js
import React, { useState, useEffect } from "react";
import { ResultCard } from "./ResultCard";
import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-poster" />
    <div className="skeleton-text-line short" />
    <div className="skeleton-text-line long" />
  </div>
);

export const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1) onChange теперь только обновляет query
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  // 2) useEffect запускает fetch при каждом изменении query
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.REACT_APP_TMDB_KEY
    }&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
      query
    )}`;

    // === DEBUG PANEL ===
    console.log("Searching URL:", url);

 fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // Отладочный лог: покажет весь ответ API
    console.log("API response:", data);

    setResults(Array.isArray(data.results) ? data.results : []);
    setLoading(false);
  })
  .catch((err) => {
    console.error("Search error:", err);
    setResults([]);
    setLoading(false);
  });
  }, [query]);

  return (
    <>
      {/* === DEBUG PANEL ON SCREEN === */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          fontSize: "12px",
          padding: "0.5rem",
          zIndex: 9999,
          maxHeight: "100px",
          overflow: "auto",
        }}
      >
        <div>🔍 URL: {`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${encodeURIComponent(query)}`}</div>
        <div>⌛ Loading: {loading.toString()}</div>
        <div>📊 Results: {results.length}</div>
      </div>

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
          ) : results.length > 0 ? (
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
    </>
  );
};
