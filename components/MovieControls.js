// src/components/MovieControls.js
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
// — добавлен импорт motion для анимаций
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export const MovieControls = ({ movie, type }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "watchlist" && (
        <>
          {/* — motion.button вместо обычной кнопки, hover и tap эффекты */}
          <motion.button
            className="ctrl-btn"
            onClick={() => {
              addMovieToWatched(movie);
              toast.success(`${movie.title} added to Watched!`);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <i className="fa-fw far fa-eye"></i>
          </motion.button>

          <motion.button
            className="ctrl-btn"
            onClick={() => {
              removeMovieFromWatchlist(movie.id);
              toast.info(`${movie.title} removed from Watchlist`);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <i className="fa-fw fa fa-times"></i>
          </motion.button>
        </>
      )}

      {type === "watched" && (
        <>
          <motion.button
            className="ctrl-btn"
            onClick={() => {
              moveToWatchlist(movie);
              toast.success(`${movie.title} moved back to Watchlist`);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <i className="fa-fw far fa-eye-slash"></i>
          </motion.button>

          <motion.button
            className="ctrl-btn"
            onClick={() => {
              removeFromWatched(movie.id);
              toast.info(`${movie.title} removed from Watched`);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <i className="fa-fw fa fa-times"></i>
          </motion.button>
        </>
      )}
    </div>
  );
};
