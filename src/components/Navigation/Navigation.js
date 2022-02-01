import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navigation">
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
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
