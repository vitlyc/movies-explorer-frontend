import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";

export default function Profile() {
  return (
    <>
      <Header
        style={{ backgroundColor: "#FFFFFF" }}
        children={<Navigation />}
      />
      <main className="profile">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <div className="profile__form">
          <form className="form-profile" name="form-profile">
            <label className="form-profile__label">
              Имя
              <input
                type="text"
                className="form-profile__input"
                name="name"
                placeholder="Ваше имя"
                minLength={2}
                maxLength={30}
              />
            </label>

            <label className="form-profile__label">
              E-mail
              <input
                type="email"
                className="form-profile__input"
                name="email"
                placeholder="Ваш e-mail"
              />
            </label>
          </form>
        </div>
        <button className="profile__button">Редактировать</button>

        <button className="profile__button profile__exit-button">
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}
