import "./SearchForm.css";
import FormValidator from "../../utils/FormValidator";

export default function SearchForm({
  onSearch,
  shortMovie,
  setShortMovie,
  sendingRequest,
}) {
  const { values, isValid, handleChange } = FormValidator();

  const { searchRequest } = values;
  
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onSearch(searchRequest);
  }
  const shortMovieHandler = () => {
    setShortMovie(!shortMovie);
  };
  return (
    <div className="search-form">
      <form className="form-search" name="search" onSubmit={handleFormSubmit} noValidate>
        <input
          className="form-search__input"
          minLength={2}
          name="searchRequest"
          onChange={handleChange}
          value={searchRequest || ""}
          required
          disabled={sendingRequest ? true : false}
        />
        <button
          type="submit"
          className="form-search__submit-button"
          disabled={isValid ? false : true}
        >
          Поиск
        </button>
      </form>
      <div className="switch">
        <input
          id="switch"
          className="switch__input"
          type="checkbox"
          name="shortMovies"
          onClick={shortMovieHandler}
        />

        <label htmlFor="switch" className="switch__label">
          Короткометражки
        </label>
      </div>
    </div>
  );
}
