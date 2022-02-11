import "./MoviesCardList.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import getHoursAndMins from "../../utils/getHoursAndMins";
import { MOVIES_API_URL } from "../../utils/constants";

import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";
import Preloader from "../Preloader/Preloader";

export default function MoviesCardList({
  movies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  preloaderVisible,
  handleButtonClick,
  amountMovieCards,
  setAmountMovieCards,
  amountMovieCardsSetter,
  searchMessage,
  setSearchMessage,
}) {
  const { pathname } = useLocation();
   useEffect(() => {
     if (movies.length == 0) {
       setSearchMessage("Ничего не найдено");
     } else {
       setSearchMessage("");
     }
   });
  useEffect(() => {
    setSearchMessage("");
    if (pathname !== "/saved-movies") {
      amountMovieCardsSetter();
    }
  }, []);

 

  return (
    <section className="movies-cardlist">
      <Preloader preloaderVisible={preloaderVisible} />
      {searchMessage.length !== 0 ? (
        <p className="movies-cardlist__message">{searchMessage}</p>
      ) : (
        ""
      )}
      <ul className="movies-cardlist__list" id="hidden">
        {pathname === "/movies"
          ? movies
              .slice(0, amountMovieCards.startCards)
              .map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  title={movie.nameRU}
                  filmDuration={getHoursAndMins(movie)}
                  imageUrl={`${MOVIES_API_URL}${movie.image.url}`}
                  trailerLink={movie.trailerLink}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              ))
          : movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                title={movie.nameRU}
                filmDuration={getHoursAndMins(movie)}
                imageUrl={movie.image}
                trailerLink={movie.trailer}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
                savedMovies={movies}
              />
            ))}
      </ul>
    </section>
  );
}
