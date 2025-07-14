import { useState } from "react";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import EmptyState from "../components/EmptyState";
import { useWatch } from "../context/WatchContext";
import type { Film } from "../context/WatchContext";

const FavouritesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const { toggleFilm, watchListStore: watchList } = useWatch();

  const handleRemove = () => {
    if (selectedFilm) {
      toggleFilm(selectedFilm);
    }
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="main">
      <div className="content">
        <h1>Избранное</h1>
        {watchList?.length ? (
          <div className="cards">
            {watchList.map((film) => (
              <Card
                key={film.kinopoiskId}
                obj={{
                  posterUrl: film.posterUrl,
                  nameRu: film.nameRu,
                  year: film.year,
                  ...film,
                }}
                rating={film.ratingKinopoisk}
                filmId={film.kinopoiskId}
                onAddClick={() => {
                  setSelectedFilm(film);
                  setShowModal(true);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="В избранном ничего не найдено" emoji="🔍" />
        )}
        <Modal
          visible={showModal}
          currentFilm={selectedFilm}
          onConfirm={handleRemove}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default FavouritesPage;
