import "./AboutMe.css";
import thisPerson from "../../images/thisPerson2.jpg";

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="section__container section__container_narrow">
        <h2 className="section__header">Студент</h2>
        <article className="about-me__bio">
          <div className="about-me__info">
            <div className="about-me__name">Виталий</div>
            <div className="about-me__title">Фронтенд-разработчик, 30 лет</div>
            <p className="about-me__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб&#8209;разработке,
              начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__list">
              <li>
                <a
                  rel="noreferrer"
                  href="https://www.facebook.com"
                  className="about-me__link"
                  target="_blank"
                >
                  FaceBook
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  href="https://github.com"
                  className="about-me__link"
                  target="_blank"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>

          <img className="about-me__photo" alt="фотография" src={thisPerson} />
        </article>
      </div>
    </section>
  );
}
