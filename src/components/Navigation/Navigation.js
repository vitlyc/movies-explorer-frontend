import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div class="navigation">
      <input id="menu-toggle" type="checkbox" />
      <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button"></div>
      </label>
      <ul class="menu">
        <li>
          <Link to="/">Главная</Link>
        </li>

        <li>
          <Link to="/movies">Фильмы</Link>
        </li>
        <li>
          <Link to="/saved-movies">Сохраненные фильмы</Link>
        </li>
        <li>
          <Link to="/profile">Аккаунт</Link>
        </li>
      </ul>
    </div>
  );
}
//<Link to="about">About</Link>