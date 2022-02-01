import { Link } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  return (
    <div className="auth">
      <Link to="/signup">
        <button className="auth__register">Регистрация</button>
      </Link>
      <Link to="/signin">
        <button className="auth__login">Войти</button>
      </Link>
    </div>
  );
}
