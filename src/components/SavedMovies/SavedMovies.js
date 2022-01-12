import "./SavedMovies.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreButton from "../MoreButton/MoreButton";
import Footer from "../Footer/Footer";

export default function SavedMovies() {
  return (
    <>
      <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      <SearchForm />
      <MoviesCardList />
      <MoreButton />
      <Footer />
    </>
  );
}
