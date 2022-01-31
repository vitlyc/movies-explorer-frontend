import Header from "../Header/Header";
import Auth from "../Auth/Auth";
import Promo from "../Promo/Promo";
import NavTab from "../NavTab/NavTab";
import Navigation from "../Navigation/Navigation";

import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";

export default function Main({ isLoggedIn }) {
  return (
    <>
      {!isLoggedIn ? (
        <Header style={{ backgroundColor: "#073042" }} children={<Auth />} />
      ) : (
        <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
      )}
      <main className="main">
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer />
      </main>
    </>
  );
}
