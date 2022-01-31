import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

export default function SavedMovies({
  isLoggedIn,
  onSearch,
  shortMovie,
  setShortMovie,
  filterShortMovies,
  movies,
  savedMovies,
  handleButtonClick,
  searchMessage,
  setSearchMessage,
}) {
  return (
    <>
      <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      <SearchForm
        onSearch={onSearch}
        shortMovie={shortMovie}
        setShortMovie={setShortMovie}
      />
      <MoviesCardList
        movies={filterShortMovies(movies)}
        handleButtonClick={handleButtonClick}
        searchMessage={searchMessage}
        setSearchMessage={setSearchMessage}
      />
      <Footer />
    </>
  );
}
