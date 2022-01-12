import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

const createArray = (length) => [...Array(length)];
function makeVisibleList() {
  setTimeout(function () {
    document.getElementById("preloader").style.display = "none";

    document.getElementById("hidden").style.display = "grid";
  }, 1500);
}
export default function MoviesCardList({ totalMovies = 5 }) {
  return (
    <section className="movies-cardlist">
      <Preloader />
      <ul className="movies-cardlist__list" id="hidden">
        {createArray(totalMovies).map((n, i) => (
          <MoviesCard key={i} />
        ))}
      </ul>
      {makeVisibleList()}
    </section>
  );
}
