// src/components/MovieCard3D.js
import React from "react";
import { MovieControls } from "./MovieControls";
import "./MovieCard3D.css";

export const MovieCard3D = ({ movie, type = "watchlist" }) => (
  <div className="card-3d">
    <div className="card-inner">
      {/* передняя сторона */}
      <div className="card-face card-front">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* тыльная сторона */}
      <div className="card-face card-back">
        {/* 1) отражение */}
        <div
          className="card-reflection"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})`,
          }}
        />

        {/* 2) основной контент поверх отражения */}
        <div className="card-back-content">
          <h4 className="card-back-title">{movie.title}</h4>
          <p className="card-back-year">{movie.release_date?.slice(0, 4)}</p>
          <div className="card-back-controls">
            <MovieControls movie={movie} type={type} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
