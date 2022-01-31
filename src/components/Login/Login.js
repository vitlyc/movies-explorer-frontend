import { Link } from "react-router-dom";

import "./Login.css";
import logo from "../../images/logo.svg";
import FormValidator from "../../utils/FormValidator";

export default function Login({ handleLogin, authMessage, sendingRequest }) {
  const { values, errors, isValid, handleChange, resetForm } = FormValidator();
  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({ email, password });
    resetForm();
  }
  return (
    <section className="login">
      <div className="login__container">
        <div className="login__header">
          <Link to="/">
            <img src={logo} alt="логотип" className="logo"></img>
          </Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <div className="login__form">
          <form className="form" name="form-login" onSubmit={handleSubmit} noValidate>
            <label htmlFor="email" className="form__label">
              E-mail
            </label>
            <input
              required
              id="email"
              type="email"
              className="form__input"
              name="email"
              placeholder="Введите e-mail"
              onChange={handleChange}
              value={email || ""}
              disabled={sendingRequest ? true : false}
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
              minLength={8}
              placeholder="Введите пароль"
              onChange={handleChange}
              value={password || ""}
              disabled={sendingRequest ? true : false}
            />
            <span className="form__span">{errors.password}</span>
            <button
              type="submit"
              className={`login__submit-button ${!isValid ? "login__submit-button_disabled" : ""}`}
              disabled={!isValid || sendingRequest ? true : false}
            >
              Войти
            </button>
            <p className="login__message">{authMessage}</p>

            <div className="login__redirect">
              <p className="login__text">Ещё не зарегистрированы?</p>
              <Link to="/signup">
                <p className="login__link">Регистрация</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
