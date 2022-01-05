import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { initialCards as movie } from "../../utils/initialCards";

export default function MoviesCard() {
  let location = useLocation();

  function replaceButton(event) {
    const elem = event.target;
    elem.classList.toggle("movies-card__button-checked");
    // elem.style.display = 'block'
  }
  function getHoursAndMins() {
    const hours = Math.floor(movie.duration / 60);
    const mins = movie.duration % 60;
    return hours + "ч " + mins + "м";
  }

  return (
    <li className="movies-card">
      {/* <button className="movies-card__button-checked"></button> */}
      <button className="movies-card__button-save" onClick={(event) => replaceButton(event)} />
      {/* <button className="movies-card__button-delete"></button> */}
      <a className="movies-card__link" href={movie.trailer} target="_blank">
        <img className="movies-card__poster" src={movie.image} alt="Постер фильма" />
      </a>

      <div className="movies-card__info">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">{getHoursAndMins()}</p>
      </div>
    </li>
  );
}
