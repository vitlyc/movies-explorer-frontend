import "./SearchForm.css";

export default function SearchForm() {
  return (
    <div className="search-form">
      <form className="form-search" name="search">
        <input
          className="form-search__input"
          placeholder="Фильм"
          type="text"
          required
          minLength={2}
        />
        <button type="submit" className="form-search__submit-button">
          Поиск
        </button>
      </form>
      <div className="switch">
        <input id="switch" className="switch__input" type="checkbox" />

        <label htmlFor="switch" className="switch__label">
          Короткометражки
        </label>
      </div>
    </div>
  );
}
