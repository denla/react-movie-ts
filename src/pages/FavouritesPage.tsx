import { useState } from "react";
import Modal from "../components/Modal";
import Card from "../components/Card";
import EmptyState from "../components/EmptyState";
import { observer } from "mobx-react-lite";
import { watchStore } from "../context/WatchStore";

import type { Film } from "../types/types";

const FavouritesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  const handleRemove = () => {
    if (selectedFilm) {
      watchStore.toggleFilm(selectedFilm);
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
        {watchStore.watchList?.length ? (
          <div className="cards">
            {watchStore.watchList.map((film) => (
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
          <EmptyState title="В избранном ничего не найдено" />
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

export default observer(FavouritesPage);
