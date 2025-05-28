// src/components/MovieCard3D.js
import React from "react";
import { MovieControls } from "./MovieControls"; // подключаем контролы
import "./MovieCard3D.css"; // стили для 3D-флипа

export const MovieCard3D = ({ movie, type = "watchlist" }) => (
  <div className="card-3d">
    <div className="card-inner">
      {/* Передняя сторона: постер */}
      <div className="card-face card-front">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      {/* Тыльная сторона: заголовок, год и кнопки */}
      <div className="card-face card-back">
        <h4 className="card-back-title">{movie.title}</h4>
        <p className="card-back-year">
          {movie.release_date ? movie.release_date.slice(0, 4) : ""}
        </p>
        {/* вот здесь твои кнопки */}
        <div className="card-back-controls">
          <MovieControls movie={movie} type={type} />
        </div>
      </div>
    </div>
  </div>
);
