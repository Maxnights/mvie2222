// src/components/Home.js
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Slider from "react-slick";
import { MovieCard3D } from "./MovieCard3D";

export default function Home() {
  const { watchlist, watched } = useContext(GlobalContext);

  // Выбираем "хит": первый фильм из watchlist или watched
  const heroMovie = watchlist.length > 0 ? watchlist[0] : watched[0] || null;
  const heroUrl = heroMovie
    ? `https://image.tmdb.org/t/p/original${heroMovie.poster_path}`
    : "";

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 320, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div
      className="home-wrapper"
      style={{ backgroundImage: `url(${heroUrl})` }}
    >
      {/* Полупрозрачный overlay поверх фонового изображения */}
      <div className="overlay" />

      <main className="home-page">
        {/* Hero-баннер */}
        <section className="home-hero">
          <h2>Welcome back!</h2>
          <p>Check out your movies.</p>
        </section>

        {/* Карусель "My Watchlist" */}
        <section className="carousel-section">
          <Slider {...settings}>
            {watchlist.map((m) => (
              <div key={m.id}>
                <MovieCard3D movie={m} type="watchlist" />
              </div>
            ))}
          </Slider>
        </section>

        {/* Карусель "Watched" */}
        <section className="carousel-section">
          <Slider {...settings}>
            {watched.map((m) => (
              <div key={m.id}>
                <MovieCard3D movie={m} type="watched" />
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
}
