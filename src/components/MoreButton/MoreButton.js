import "./MoreButton.css";

export default function MoreButton({ amountMovieCards, setAmountMovieCards, movies }) {
  return (
    <div className="more-button">
      <button
        className="more-button__button"
        className={`more-button__button ${
          amountMovieCards.startCards < movies.length ? "" : "more-button__button_hidden"
        }`}
        onClick={() => {
          setAmountMovieCards({
            ...amountMovieCards,
            startCards: amountMovieCards.startCards + amountMovieCards.moreCards,
          });
        }}
      >
        Ещё
      </button>
    </div>
  );
}
