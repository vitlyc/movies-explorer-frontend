import "./NotFound.css";
import { useNavigate } from "react-router-dom";



export default function NotFound() {
  const histiry = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__header">404</h1>
        <p className="not-found__text">Страница не найдена</p>
        <button className="not-found__back" onClick={() => histiry(-1)}>
          Назад
        </button>
      </div>
    </section>
  );
}
