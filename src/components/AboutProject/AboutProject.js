import "./AboutProject.css";
import React from "react";

export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="section__container">
        <h2 className="section__header">О проекте</h2>
        <div className="about-project__articles">
          <article className="about-project__article">
            <h3 className="about-project__title">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </article>
          <article className="about-project__article">
            <h3 className="about-project__title">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </article>
        </div>
        <div className="timeline">
          <div className="timeline__backend">
            <div className="timeline__indicator timeline__indicator_highlight">
              1 неделя
            </div>
            <div className="timeline__title">Back-end</div>
          </div>
          <div className="timeline__frontend">
            <div className="timeline__indicator ">4 недели</div>
            <div className="timeline__title">Front-end</div>
          </div>
        </div>
      </div>
    </section>
  );
}
