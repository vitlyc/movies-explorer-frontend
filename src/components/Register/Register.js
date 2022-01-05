import { Link } from "react-router-dom";

import "./Register.css";
import logo from "../../images/logo.svg";

export default function Register() {
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
          <form className="form" name="form-register">
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
            />
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
            />
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
            />
            <span className="form__span">Что-то пошло не так...</span>
          </form>
          <button type="submit" className="register__submit-button">
            Зарегистрироваться
          </button>
          <div className="register__redirect">
            <p className="register__text">Уже зарегистрированы?</p>

            <Link to="/signin">
              <p className="register__link">Войти</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
