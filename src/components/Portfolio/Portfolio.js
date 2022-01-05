import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="section__container section__container_higher section__container_narrow">
        <div className="portfolio__header">Портфолио</div>
        <ul className="portfolio__list">
          <li className="portfolio__work">
            <a
              href="https://github.com/"
              className="portfolio__link"
              target="_blank"
            >
              Статичный сайт
            </a>
          </li>
          <li className="portfolio__work">
            <a
              href="https://github.com/"
              className="portfolio__link"
              target="_blank"
            >
              Адаптивный сайт
            </a>
          </li>
          <li className="portfolio__work">
            <a
              href="https://github.com/"
              className="portfolio__link"
              target="_blank"
            >
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
