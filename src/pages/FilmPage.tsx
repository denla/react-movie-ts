import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ratingIcon from "../images/icon-star-black.svg";
import key from "../config";
import { useWatch } from "../context/WatchContext";
import axios from "axios";

interface Genre {
  genre: string;
}

interface Film {
  posterUrl: string;
  nameRu: string;
  year: number;
  ratingKinopoisk: number;
  genres: Genre[];
  description: string;
  kinopoiskId: number;
}

const FilmPage = () => {
  const { filmId } = useParams<{ filmId: string }>();
  const [currentFilm, setCurrentFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);
  const { isInWatchList, toggleFilm } = useWatch();

  useEffect(() => {
    if (!filmId) return;
    setLoading(true);
    axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`, {
        headers: {
          "X-API-KEY": key,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setCurrentFilm(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных о фильме:", err);
        setLoading(false);
      });
  }, [filmId]);

  return (
    <div className="main">
      <div className="content">
        <div className="content-header">
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>

        {!loading && currentFilm && (
          <div className="film">
            <div className="film__info">
              <div
                className="film__cover"
                style={{ backgroundImage: `url("${currentFilm.posterUrl}")` }}
              ></div>
            </div>
            <div className="film__info">
              <div className="film__desc">
                <h1 className="film__name">{currentFilm.nameRu}</h1>
                <h3 className="film__year">{currentFilm.year}</h3>
              </div>
              <div className="film__rating">
                <img src={ratingIcon} alt="Рейтинг" />
                {currentFilm.ratingKinopoisk}
              </div>

              <div className="genre-options">
                {currentFilm.genres.map((genre, index) => (
                  <div key={index} className="chip">
                    {genre.genre}
                  </div>
                ))}
              </div>

              <button
                className="btn-main"
                style={{ width: "fit-content" }}
                onClick={() =>
                  toggleFilm({
                    ...currentFilm,
                    year: String(currentFilm.year),
                  })
                }
              >
                {isInWatchList(Number(filmId))
                  ? "Удалить из списка"
                  : "Посмотрю"}
              </button>

              <div className="card-content">
                <h4>О фильме</h4>
                <p className="film__text text-grey">
                  {currentFilm.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmPage;
