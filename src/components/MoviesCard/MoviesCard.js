import { useLocation } from "react-router-dom";
import { initialCards as movie } from "../../utils/initialCards";

import "./MoviesCard.css";

export default function MoviesCard() {
  const location = useLocation();

  function setButton() {
    if (location.pathname === "/movies") {
      return <button className="movies-card__button-save" onClick={(event) => handleButton(event)} />;
    } else {
      return <button className="movies-card__button-delete" />;
    }
  }

  function handleButton(event) {
    const elem = event.target;
    elem.classList.toggle("movies-card__button-checked");
  }

  function getHoursAndMins() {
    const hours = Math.floor(movie.duration / 60);
    const mins = movie.duration % 60;
    return hours + "ч " + mins + "м";
  }

  return (
    <li className="movies-card">
      {setButton()}
      <a className="movies-card__link" href={movie.trailer} target="_blank" rel="noreferrer">
        <img className="movies-card__poster" src={movie.image} alt="Постер фильма" />
      </a>

      <div className="movies-card__info">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">{getHoursAndMins()}</p>
      </div>
    </li>
  );
}
