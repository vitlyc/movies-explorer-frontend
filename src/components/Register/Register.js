import { Link, useNavigate } from "react-router-dom";
import FormValidator from "../../utils/FormValidator";
import "./Register.css";
import logo from "../../images/logo.svg";

export default function Register({ handleRegister, authMessage, sendingRequest, isLoggedIn }) {
  const { values, errors, isValid, handleChange, resetForm } = FormValidator();
  const { name, email, password } = values;

  const handleRegisterFormSubmit = (evt) => {
    evt.preventDefault();
    handleRegister({ name, email, password });
    resetForm();
  };


  return (
    <section className="register">
      <div className="register__container">
        <div className="register__header">
          <Link to="/">
            <img src={logo} alt="логотип" className="logo"></img>
          </Link>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <div className="register__form">
          <form
            className="form"
            name="form-register"
            onSubmit={handleRegisterFormSubmit}
            noValidate
          >
            <label htmlFor="name" className="form__label">
              Имя
            </label>
            <input
              required
              id="name"
              type="text"
              className="form__input"
              name="name"
              minLength={2}
              maxLength={30}
              placeholder="Введите имя"
              onChange={handleChange}
              value={name || ""}
            />
            <span className="form__span">{errors.name}</span>

            <label htmlFor="email" className="form__label">
              E-mail
            </label>
            <input
              required
              id="email"
              type="email"
              className="form__input"
              name="email"
              pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
              placeholder="Введите e-mail"
              onChange={handleChange}
              value={email || ""}
            />
            <span className="form__span">{errors.email}</span>

            <label htmlFor="password" className="form__label">
              Пароль
            </label>
            <input
              required
              id="password"
              type="password"
              className="form__input"
              name="password"
              autoComplete="off"
              minLength={8}
              placeholder="Введите пароль"
              onChange={handleChange}
              value={password || ""}
            />
            <span className="form__span">{errors.password}</span>
            <button
              type="submit"
              className={`register__submit-button ${
                !isValid ? "register__submit-button_disabled" : ""
              }`}
              disabled={!isValid || sendingRequest ? true : false}
            >
              Зарегистрироваться
            </button>
            <p className="register__message">{authMessage}</p>

            <div className="register__redirect">
              <p className="register__text">Уже зарегистрированы?</p>

              <Link to="/signin">
                <p className="register__link">Войти</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
