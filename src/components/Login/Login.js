import { Link } from "react-router-dom";

import "./Login.css";
import logo from "../../images/logo.svg";

export default function Login() {
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
          <form className="form" name="form-login">
            <label htmlFor="email" className="form__label">
              E-mail
            </label>
            <input required id="email" type="email" className="form__input" name="email" placeholder="Введите e-mail" />
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
          </form>
          <button type="submit" className="login__submit-button">
            Войти
          </button>
          <div className="login__redirect">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <Link to="/signup">
              <p className="login__link">Регистрация</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
