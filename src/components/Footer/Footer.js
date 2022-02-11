import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__panel">
          <p className="">&copy; 2021</p>
          <ul className="footer__list">
            <li className="footer__link">
              <a href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__link">
              <a href="https://github.com/Yandex-Practicum" target="_blank" rel="noreferrer" className="footer__link">
                Github
              </a>
            </li>
            <li className="footer__link">
              <a
                href="https://www.facebook.com/yandex.practicum/"
                target="_blank"
                rel="noreferrer"
                className="footer__link"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
