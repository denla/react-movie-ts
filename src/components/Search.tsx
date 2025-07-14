import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import axios from "axios";

import { SearchCard } from "./SearchCard";
import closeIcon from "../images/icon-close.svg";
import EmptyState from "./EmptyState";
import key from "../config";
import SearchCardLoader from "./skeletons/SearchCardLoader";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) return;

      try {
        const response = await axios.get(
          `https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword`,
          {
            params: {
              keyword: query,
              page: 1,
            },
            headers: {
              "X-API-KEY": key,
              "Content-Type": "application/json",
            },
          }
        );

        setResults(response.data.films || []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (searchText) {
      fetchResults(searchText);
    } else {
      setResults([]);
    }
  }, [searchText, fetchResults]);

  const onClose = () => {
    setSearchText("");
    setResults([]);
    setLoading(true);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="search-container">
      <input
        className="input-search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Поиск"
      />

      {searchText && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="search-results" onClick={(e) => e.stopPropagation()}>
            <div className="input-search__container">
              <input
                className="search-results__input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="input-search__clear">
                <button className="btn-round modal-close" onClick={onClose}>
                  <img src={closeIcon} alt="Закрыть" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="search-results__cards">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SearchCardLoader key={i} />
                ))}
              </div>
            ) : results.length > 0 ? (
              <div className="search-results__cards">
                {results.slice(0, 6).map((film) => (
                  <SearchCard
                    key={film.filmId}
                    obj={film}
                    filmId={film.filmId}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title="Ничего не найдено. Попробуйте снова" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
