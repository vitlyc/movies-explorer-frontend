import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/currentUser/CurrentUserContext";
import FormValidator from "../../utils/FormValidator";

export default function Profile({
  isLoggedIn,
  authMessage,
  setAuthMessage,
  handleUpdateUser,
  handleLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, isValid, handleChange, resetForm } = FormValidator();
  const { name, email } = values;
  const [isUserInfoEdit, setIsUserInfoEdit] = useState(false);
  const [isValuesEqual, setIsValuesEqual] = useState(true);
  const [displaySaveButton, setDisplaySaveButton] = useState("none");

  useEffect(() => {
    setAuthMessage("");
  }, [setAuthMessage]);

  useEffect(() => {
    (isUserInfoEdit) ? setDisplaySaveButton("block") : setDisplaySaveButton("none");
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser, isUserInfoEdit]);

  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
      setIsValuesEqual(true);
    } else {
      setIsValuesEqual(false);
    }
  }, [name, email, currentUser]);

  const editButtonClickHandler = (evt) => {
    evt.preventDefault();
    setIsUserInfoEdit(!isUserInfoEdit);
    setAuthMessage("");
    if (isUserInfoEdit === false) {
      resetForm();
    }
  };

  const handleProfileFormSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ name, email });
    setIsUserInfoEdit(!isUserInfoEdit);
    resetForm();
  };

  return (
    <>
      <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      <main className="profile">
        <h1 className="profile__header">Привет, {currentUser.name}!</h1>
        <div className="profile__form">
          <form className="form-profile" name="form-profile" onSubmit={handleProfileFormSubmit}>
            <label className="form-profile__label">
              Имя
              <input
                autoComplete="off"
                type="text"
                className="form-profile__input"
                name="name"
                placeholder={currentUser.name}
                minLength={2}
                maxLength={30}
                value={name || ""}
                disabled={isUserInfoEdit ? false : true}
                onChange={handleChange}
              />
            </label>
            <span className="form__span">{errors.name}</span>

            <label className="form-profile__label">
              E-mail
              <input
                autoComplete="off"
                type="email"
                className="form-profile__input"
                name="email"
                placeholder={currentUser.email}
                value={email || ""}
                disabled={isUserInfoEdit ? false : true}
                onChange={handleChange}
              />
            </label>
            <span className="form__span">{errors.email}</span>
            <button
              className={`profile__save-button ${
                isValid && !isValuesEqual && isUserInfoEdit ? "" : "profile__save-button_disabled" 
              }`}
              type="submit"
              disabled={isValid && !isValuesEqual && isUserInfoEdit ? false : true}
              style={{ display: `${displaySaveButton}` }}
            >
              Сохранить
            </button>
          </form>
          <p className="profile__span">{authMessage}</p>
        </div>

        <button className="profile__button" onClick={editButtonClickHandler}>
          {!isUserInfoEdit ? "Редактировать" : "Отменить"}
        </button>

        <button className="profile__button profile__exit-button" onClick={handleLogout}>
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}
