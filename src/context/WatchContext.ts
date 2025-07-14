import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Film {
  kinopoiskId: number;
  posterUrl: string;
  nameRu: string;
  year: string;
  ratingKinopoisk?: number;
  // другие поля, если нужны
}

interface WatchContextType {
  watchListStore: Film[];
  toggleFilm: (film: Film) => void;
  isInWatchList: (id: number) => boolean;
}

const WatchContext = createContext<WatchContextType | undefined>(undefined);

interface WatchProviderProps {
  children: ReactNode;
}

export const WatchProvider = ({ children }: WatchProviderProps) => {
  const [watchListStore, setWatchListStore] = useState<Film[]>(() => {
    const stored = localStorage.getItem("watchList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchListStore));
  }, [watchListStore]);

  const toggleFilm = (selectedFilm: Film) => {
    setWatchListStore((prev) => {
      const exists = prev.some(
        (film) => film.kinopoiskId === selectedFilm.kinopoiskId
      );
      if (exists) {
        return prev.filter(
          (film) => film.kinopoiskId !== selectedFilm.kinopoiskId
        );
      }
      return [...prev, selectedFilm];
    });
  };

  const isInWatchList = (id: number) =>
    watchListStore.some((film) => film.kinopoiskId === id);

  return React.createElement(
    WatchContext.Provider,
    { value: { watchListStore, toggleFilm, isInWatchList } },
    children
  );
};

export const useWatch = (): WatchContextType => {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatch must be used within a WatchProvider");
  }
  return context;
};
