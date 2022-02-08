import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";
import { useState, useEffect } from "react";

export default function SavedMovies({
  isLoggedIn,
  onSearch,
  shortMovie,
  setShortMovie,
  filterShortMovies,
  movies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  searchMessage,
  setSearchMessage,
  setFoundSavedMovies,
}) {
  const [stateSavedMovieForm, setStateSavedMovieForm] = useState({
    isShort: false,
    reqText: "",
  });

  function filterShortMovies(movies) {
    if (stateSavedMovieForm.isShort) {
      return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter((movie) => movie.duration > 0);
    }
  }
  useEffect(() => {
    setSearchMessage("");
    setFoundSavedMovies(savedMovies);
  }, []);
  useEffect(() => {
    const savedMoviesSwitch = localStorage.getItem("savedMoviesSwitch");
    setStateSavedMovieForm({
      isShort: JSON.parse(savedMoviesSwitch),
      reqText: stateSavedMovieForm.reqText,
    });
  }, []);
  return (
    <>
      <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      <SearchForm
        onSearch={onSearch}
        shortMovie={stateSavedMovieForm}
        setShortMovie={setStateSavedMovieForm}
        setSearchMessage={setSearchMessage}
      />
      <MoviesCardList
        movies={filterShortMovies(movies)}
        savedMovies={savedMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        searchMessage={searchMessage}
        setSearchMessage={setSearchMessage}
      />
      <Footer />
    </>
  );
}
