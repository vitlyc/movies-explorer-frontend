import "./SearchForm.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SearchForm({
  onSearch,
  shortMovie,
  setShortMovie,
  sendingRequest,
}) {
  const location = useLocation();
 
  function handleFormSubmit(evt) {
    evt.preventDefault();
    onSearch(shortMovie.reqText, location);
  }
  function handleChangeSwitch(evt) {
    setShortMovie({ isShort: !shortMovie.isShort, reqText: shortMovie.reqText });
    
  }
  function handleChangeInput(evt) {
    setShortMovie({ isShort: shortMovie.isShort, reqText: evt.target.value });
  }


  useEffect(() => {
    return ()=>{
     if (location.pathname === "/movies") {
       localStorage.setItem("moviesSwitch", JSON.stringify(shortMovie.isShort));
     } else {
       localStorage.setItem("savedMoviesSwitch", JSON.stringify(shortMovie.isShort));
     }
    }
  }, );
 

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
