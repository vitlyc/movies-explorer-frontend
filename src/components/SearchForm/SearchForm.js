import "./SearchForm.css";
import FormValidator from "../../utils/FormValidator";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchForm({ onSearch, shortMovie, setShortMovie, sendingRequest, setSearchMessage }) {
  const location = useLocation();

  function handleFormSubmit(evt) {
//     checkingRequest();
// console.log('submit');
    evt.preventDefault();
    // setSearchMessage("Введите минимум два символа");
    // checkingRequest();
    onSearch(shortMovie, location);
  }
  function handleChangeSwitch() {
    setShortMovie({ reqText: shortMovie.reqText, isShort: !shortMovie.isShort });
  }
  function handleChangeInput(evt) {
    setShortMovie({ reqText: evt.target.value, isShort: shortMovie.isShort });
  }
  // function checkingRequest(){
  //   console.log('hi');
  //   console.log(shortMovie.reqText.length);
  //   if(shortMovie.reqText.length <2) {
  //     setSearchMessage('Введите минимум два символа');
  //     return
  //   }
  // }

  return (
    <div className="search-form">
      <form className="form-search" name="search" onSubmit={handleFormSubmit} noValidate>
        <input
          className="form-search__input"
          minLength={2}
          name="searchRequest"
          onChange={handleChangeInput}
          value={shortMovie.reqText}
          required
          disabled={sendingRequest ? true : false}
        />
        <button
          type="submit"
          className="form-search__submit-button"
          disabled={sendingRequest ? true : false}
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
          onChange={handleChangeSwitch}
          checked={shortMovie.isShort}
        />

        <label htmlFor="switch" className="switch__label">
          Короткометражки
        </label>
      </div>
    </div>
  );
}
