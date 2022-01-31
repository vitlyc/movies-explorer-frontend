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
          ? movies.slice(0, amountMovieCards.startCards)
              .map((movie) => (
                <MoviesCard
                  key={movie.id}
                  movie={movie}
                  title={movie.nameRU}
                  filmDuration={getHoursAndMins(movie)}
                  imageUrl={`${MOVIES_API_URL}${movie.image.url}`}
                  trailerLink={movie.trailerLink}
                  handleButtonClick={handleButtonClick}
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
                handleButtonClick={handleButtonClick}
                savedMovies={movies}
              />
            ))}
      </ul>
      {/* <MoreButton
        amountMovieCards={amountMovieCards}
        setAmountMovieCards={setAmountMovieCards}
      /> */}
    </section>
  );
}
