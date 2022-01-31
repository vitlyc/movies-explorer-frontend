import "./Movies.css";
import { useState, useEffect } from "react";
import { WIDTH_500, WIDTH_800 } from "../../utils/constants";

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
  handleButtonClick,
  preloaderVisible,
  onSearch,
  searchMessage,
  setSearchMessage,
  sendingRequest,
}) {


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
        shortMovie={shortMovie}
        setShortMovie={setShortMovie}
        sendingRequest={sendingRequest}
      />
      <MoviesCardList
        preloaderVisible={preloaderVisible}
        movies={filterShortMovies(movies)}
        savedMovies={savedMovies}
        handleButtonClick={handleButtonClick}
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
