import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import Auth from "../Auth/Auth";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import Navigation from "../Navigation/Navigation";
import MoviesCard from "../MoviesCard/MoviesCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/preloader" element={<Preloader />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/card" element={<MoviesCard />} />
        <Route path="/movies" element={<MoviesCardList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

/* <Header style={{ backgroundColor: "#073042" }} children={<Auth />} /> */

/* 
      <Promo></Promo>
      <NavTab></NavTab>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      <Footer></Footer> 
      <NotFound></NotFound>
      <Register></Register>
      <Login></Login>
      <Profile></Profile>
      <SearchForm></SearchForm>
      <Navigation></Navigation>
 
 
    <Header style={{ backgroundColor: "#FFFFFF" }} children={<Navigation />} />
        <SearchForm></SearchForm> */

// import Auth from "../Auth/Auth";
// import Promo from "../Promo/Promo";
// import NavTab from "../NavTab/NavTab";
// import AboutProject from "../AboutProject/AboutProject";
// import Techs from "../Techs/Techs";
// import AboutMe from "../AboutMe/AboutMe";
// import Portfolio from "../Portfolio/Portfolio";
