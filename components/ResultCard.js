// src/components/ResultCard.js
import React, { useContext } from "react";
import { motion } from "framer-motion";
import Moment from "react-moment";
import { GlobalContext } from "../context/GlobalState";
// Импортируем toast
import { toast } from "react-toastify";

export const ResultCard = ({ movie }) => {
  const { addMovieToWatchlist, addMovieToWatched, watchlist, watched } =
    useContext(GlobalContext);

  const inWatchlist = !!watchlist.find((m) => m.id === movie.id);
  const inWatched = !!watched.find((m) => m.id === movie.id);

  return (
    <motion.div
      className="result-card"
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            <Moment format="YYYY">{movie.release_date}</Moment>
          </h4>
        </div>

        <div className="controls">
          <button
            className="btn"
            disabled={inWatchlist || inWatched}
            onClick={() => {
              addMovieToWatchlist(movie);
              toast.success(`“${movie.title}” added to Watchlist!`);
            }}
          >
            <i className="fa fa-bookmark" /> Watchlist
          </button>
          <button
            className="btn"
            disabled={inWatched}
            onClick={() => {
              addMovieToWatched(movie);
              toast.success(`“${movie.title}” added to Watched!`);
            }}
          >
            <i className="fa fa-eye" /> Watched
          </button>
        </div>
      </div>
    </motion.div>
  );
};
