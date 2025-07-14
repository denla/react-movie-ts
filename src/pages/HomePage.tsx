import { useState, useEffect, useCallback } from "react";
import { Card } from "../components/Card";
import { useSearchParams } from "react-router-dom";
import { filmsData } from "../data/filmsData";
import key from "../config";
import { Modal } from "../components/Modal";
import CardLoader from "../components/skeletons/CardLoader";
import { useWatch } from "../context/WatchContext";
import Search from "../components/Search";
import axios from "axios";

const HomePage = () => {
  const [top, setTop] = useState(filmsData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const genres = searchParams.get("genres");
  const ratingFrom = searchParams.get("ratingFrom");
  const ratingTo = searchParams.get("ratingTo");
  const yearFrom = searchParams.get("yearFrom");
  const yearTo = searchParams.get("yearTo");

  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const { toggleFilm } = useWatch();

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      const params = {
        page: page,
        ...(genres ? { genres } : {}),
        ...(ratingFrom ? { ratingFrom } : {}),
        ...(ratingTo ? { ratingTo } : {}),
        ...(yearFrom ? { yearFrom } : {}),
        ...(yearTo ? { yearTo } : {}),
      };

      try {
        const response = await axios.get(
          "jhttps://kinopoiskapiunofficial.tech/api/v2.2/films",
          {
            params,
            headers: {
              "X-API-KEY": key,
              "Content-Type": "application/json",
            },
          }
        );

        const films = response.data.items || [];

        setTop((prev) => (page === 1 ? films : [...prev, ...films]));
        setHasMore(films.length > 0);
      } catch (error) {
        console.error("Ошибка загрузки фильмов:", error);
        setTop(filmsData);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [genres, ratingFrom, ratingTo, yearFrom, yearTo, page]);

  // Modal
  const confirmAddToWatchList = (e) => {
    e.preventDefault();
    toggleFilm(selectedFilm);
    setShowModal(false);
  };

  const cancelAdd = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  // Lazy loading
  const handleScroll = useCallback(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 150;

    if (nearBottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Reset pagination
  useEffect(() => {
    setTop([]);
    setPage(1);
  }, [genres, ratingFrom, ratingTo, yearFrom, yearTo]);

  return (
    <>
      <Search />
      <div className="main">
        <div className="content">
          <h1>Популярно сейчас</h1>
          <div className="cards">
            {top &&
              top.map(
                (film) =>
                  film.nameRu && (
                    <Card
                      key={film.kinopoiskId}
                      obj={film}
                      rating={film.ratingKinopoisk}
                      filmId={film.kinopoiskId}
                      onAddClick={() => {
                        setSelectedFilm(film);
                        setShowModal(true);
                      }}
                    />
                  )
              )}
            {loading &&
              Array.from({ length: 10 }).map((_, i) => <CardLoader key={i} />)}

            <Modal
              visible={showModal}
              currentFilm={selectedFilm}
              onConfirm={confirmAddToWatchList}
              onCancel={cancelAdd}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
