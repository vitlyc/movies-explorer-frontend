import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
  const createArray = (length) => [...Array(length)];

export default function MoviesCardList({ totalMovies = 5 }) {

  return (
    <section className="movies-cardlist">
      <ul className="movies-cardlist__list">
        {createArray(totalMovies).map((n, i) => (
          <MoviesCard key={i} />
        ))}
      </ul>
    </section>
  );
}
