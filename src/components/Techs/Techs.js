import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="section__container section__container_higher">
        <h2 className="section__header">Технологии</h2>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__technology">HTML</li>
          <li className="techs__technology">CSS</li>
          <li className="techs__technology">JS</li>
          <li className="techs__technology">React</li>
          <li className="techs__technology">Git</li>
          <li className="techs__technology">Express.js</li>
          <li className="techs__technology">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}
