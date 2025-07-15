import closeIcon from "../images/icon-close.svg";
import { watchStore } from "../context/WatchStore";
import { observer } from "mobx-react-lite";

const Modal = ({ visible, currentFilm, onConfirm, onCancel }) => {
  return (
    <div
      className={`modal-overlay ${!visible && `modal-hidden`} `}
      onClick={onCancel}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-round modal-close" onClick={onCancel}>
          <img src={closeIcon} alt="Закрыть" />
        </button>
        {currentFilm && (
          <div className="modal-title">
            <span>
              {watchStore.isInWatchList(currentFilm.kinopoiskId)
                ? "Удалить из избранного?"
                : "Добавить в избранное?"}
            </span>
            <div className="modal-film">
              <div
                className="card__cover"
                style={{ background: `url(${currentFilm.posterUrl})` }}
              ></div>
              <div className="card__info">
                <span className="card__name">{currentFilm.nameRu}</span>
                <span className="card__subtitle">{currentFilm.year}</span>
              </div>
            </div>
          </div>
        )}

        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-main btn-wide">
            Да
          </button>
          <button onClick={onCancel} className="btn-wide">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
