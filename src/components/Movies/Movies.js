import "./Movies.css";
import { useState, useEffect } from "react";
import { WIDTH_500, WIDTH_800 } from "../../utils/constants";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";

export default function Movies({
  isLoggedIn,
  shortMovie,
  setShortMovie,
  filterShortMovies,
  movies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  preloaderVisible,
  onSearch,
  searchMessage,
  setSearchMessage,
  sendingRequest,
}) {
  const [stateMovieForm, setStateMovieForm] = useState({
    isShort: false,
    reqText: "",
  });
  function filterShortMovies(movies) {
    if (stateMovieForm.isShort) {
      return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter((movie) => movie.duration > 0);
    }
  }
  const [amountMovieCards, setAmountMovieCards] = useState({
    initialMovies: 0,
    moreMovies: 0,
  });
  const amountMovieCardsSetter = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= WIDTH_500) {
      setAmountMovieCards({ startCards: 5, moreCards: 2 });
    } else if (screenWidth <= WIDTH_800) {
      setAmountMovieCards({ startCards: 8, moreCards: 2 });
    } else {
      setAmountMovieCards({ startCards: 12, moreCards: 3 });
    }
  };
  useEffect(() => {
    setSearchMessage("");
    amountMovieCardsSetter();
    if (localStorage.moviesRequest) {
      setStateMovieForm(JSON.parse(localStorage.moviesRequest));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", amountMovieCardsSetter);
    return () => {
      window.removeEventListener("resize", amountMovieCardsSetter);
    };
  }, []);

  return (
    <>
      <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      <SearchForm
        onSearch={onSearch}
        shortMovie={stateMovieForm}
        setShortMovie={setStateMovieForm}
        sendingRequest={sendingRequest}
        setSearchMessage={setSearchMessage}
      />
      <MoviesCardList
        preloaderVisible={preloaderVisible}
        movies={filterShortMovies(movies)}
        savedMovies={savedMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        amountMovieCards={amountMovieCards}
        setAmountMovieCards={setAmountMovieCards}
        amountMovieCardsSetter={amountMovieCardsSetter}
        searchMessage={searchMessage}
        setSearchMessage={setSearchMessage}
      />
      <MoreButton
        amountMovieCards={amountMovieCards}
        setAmountMovieCards={setAmountMovieCards}
        movies={movies}
      />
      <Footer />
    </>
  );
}
