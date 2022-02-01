import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

export default function Header({ style = {}, children = {} }) {
  return (
    <header className="header" style={{ ...style }}>
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="логотип" className="logo"></img>
        </Link>
        {children}
      </div>
    </header>
  );
}
