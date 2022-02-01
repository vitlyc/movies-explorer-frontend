import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


import "./MoviesCard.css";

export default function MoviesCard({
  movie,
  imageUrl,
  title,
  filmDuration,
  trailerLink,
  handleButtonClick,
  savedMovies,
}) {
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  
  function setButton() {
    if (location.pathname === "/movies") {
      return (
        <button className="movies-card__button-save" onClick={(event) => handleSaveButton(event)} />
      );
    } else {
      return (
        <button
          className="movies-card__button-delete"
          onClick={(event) => handleDeleteButton(event)}
        />
      );
    }
  }

  function handleSaveButton(event) {
    const elem = event.target;
    elem.classList.toggle("movies-card__button-checked");
    handleButtonClick(movie, isSaved);
    setIsSaved(savedMovies.some((savedMovie) => movie.id === savedMovie.id));
  }
  function handleDeleteButton(event) {
    handleButtonClick(movie, isSaved);
  }
  useEffect(() => {
    setIsSaved(savedMovies.some((savedMovie) => movie.id === savedMovie.id));
  }, [savedMovies, movie]);

  return (
    <li className="movies-card">
      {setButton()}
      <a className="movies-card__link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__poster" src={imageUrl} alt={title} />
      </a>

      <div className="movies-card__info">
        <p className="movies-card__name">{title}</p>
        <p className="movies-card__duration">{filmDuration}</p>
      </div>
    </li>
  );
}
