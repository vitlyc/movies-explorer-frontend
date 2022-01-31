import "./App.css";
import { useState, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUser/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedUserRoute from "../ProtectedUserRoute/ProtectedUserRoute";
// import { UserBlockedRoute } from "../UserBlockedRoute/UserBlockedRoute";

import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

import Main from "../Main/Main";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [shortMovie, setShortMovie] = useState(false);
  const [foundAllMovies, setFoundAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [preloaderVisible, setPreloaderVisible] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const navigate = useNavigate();

  // console.log(isLoggedIn);

  function handleLogin(data) {
    setSendingRequest(true);
    return mainApi
      .login(data)
      .then((res) => {
        checkToken();
        setAuthMessage("");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          setAuthMessage("Неверный логин или пароль.");
        } else {
          setAuthMessage(`${err.status} — ${err.statusText}`);
        }
      })
      .finally(() => {
        setSendingRequest(false);
      });
  }

  function handleRegister(data) {
    setSendingRequest(true);
    return mainApi
      .register(data)
      .then((res) => {
        setAuthMessage("");
        // const { email, password } = data;
        handleLogin(data);
      })
      .catch((err) => {
        if (err.status === 400) {
          setAuthMessage("Пользователь с таким email уже существует.");
        } else {
          setAuthMessage(`Error - ${err.status}-${err.statusText}`);
        }
      })
      .finally(() => {
        setSendingRequest(false);
      });
  }
  function checkToken() {
    mainApi
      .getUser()
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setCurrentUser({});
      });
  }
  function handleUpdateUser(user) {
    return mainApi
      .patchUser(user)
      .then((res) => {
        setCurrentUser(res);
        setAuthMessage("Профиль успешно обновлен!");
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 409) {
          setAuthMessage("Пользователь с таким email уже существует.");
        } else {
          setAuthMessage(`Error - ${err.status}`);
        }
      });
  }
  function handleLogout() {
    mainApi
      .logout()
      .then((res) => {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.clear();

        navigate("/");
      })
      .catch(console.log);
  }
  function filterShortMovies(movies) {
    if (shortMovie) {
      return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
    } else {
      return movies.filter((movie) => movie.duration > 0);
    }
  }

  function findMoviesByKeywords(movies, searchRequest) {
    if (!searchRequest) {
      return;
    }
    const foundMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );
    if (foundMovies.length === 0) {
      setSearchMessage("Ничего не найдено");
    }
    return foundMovies;
  }
  function handleSaveMovie(movie, isSaved) {
    if (isSaved) return;
    mainApi
      .postMyMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, { ...savedMovie, id: savedMovie.movieId }]);
      })
      .catch(console.log);
  }
  function handleDeleteMovie(movie) {
    const deleteMovieId = savedMovies.find((item) => item.id === movie.id)._id;
    mainApi.deleteMyMovie(deleteMovieId).then((deletedMovie) => {
      setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== deletedMovie._id));
    });
  }
  function handleMovieSearchFormSubmit(searchRequest) {
    setSearchMessage("");
    setSendingRequest(true);
    if (!localStorage.getItem("movies")) {
      setPreloaderVisible(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("movies", JSON.stringify(movies));
          setAllMovies(movies);
          const foundMovies = findMoviesByKeywords(movies, searchRequest);
          localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
          setFoundAllMovies(foundMovies);
        })
        .catch((err) => {
          setSearchMessage("Ошибка запроса");
        })
        .finally(() => {
          setPreloaderVisible(false);
          setSendingRequest(false);
        });
    } else {
      setAllMovies(JSON.parse(localStorage.movies));
      const foundMovies = findMoviesByKeywords(JSON.parse(localStorage.movies), searchRequest);
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
      setSendingRequest(false);
      setFoundAllMovies(foundMovies);
    }
  }
  function handleSavedMovieSearchFormSubmit(searchRequest) {
    setSearchMessage("");
    setFoundSavedMovies(findMoviesByKeywords(savedMovies, searchRequest));
  }

  function getSavedMovies() {
    mainApi
      .getMyMovies()
      .then((movies) => {
        const tempMovies = movies.map((movie) => {
          return { ...movie, id: movie.movieId };
        });
        setSavedMovies(tempMovies);
        setFoundSavedMovies(tempMovies);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  useEffect(() => {
    if (isLoggedIn) {
      getSavedMovies();
      if (localStorage.getItem("foundMovies")) {
        setFoundAllMovies(JSON.parse(localStorage.foundMovies));
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

        <Route
          path="/signup"
          element={
            <ProtectedUserRoute
              Component={Register}
              isLoggedIn={isLoggedIn}
              handleRegister={handleRegister}
              authMessage={authMessage}
              sendingRequest={sendingRequest}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedUserRoute
              Component={Login}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              authMessage={authMessage}
              sendingRequest={sendingRequest}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              Component={Profile}
              isLoggedIn={isLoggedIn}
              authMessage={authMessage}
              setAuthMessage={setAuthMessage}
              handleUpdateUser={handleUpdateUser}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              Component={Movies}
              isLoggedIn={isLoggedIn}
              shortMovie={shortMovie}
              setShortMovie={setShortMovie}
              filterShortMovies={filterShortMovies}
              movies={foundAllMovies}
              savedMovies={savedMovies}
              handleButtonClick={handleSaveMovie}
              preloaderVisible={preloaderVisible}
              onSearch={handleMovieSearchFormSubmit}
              searchMessage={searchMessage}
              setSearchMessage={setSearchMessage}
              sendingRequest={sendingRequest}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              Component={SavedMovies}
              isLoggedIn={isLoggedIn}
              shortMovie={shortMovie}
              setShortMovie={setShortMovie}
              filterShortMovies={filterShortMovies}
              movies={savedMovies}
              savedMovies={savedMovies}
              handleButtonClick={handleDeleteMovie}
              onSearch={handleSavedMovieSearchFormSubmit}
              searchMessage={searchMessage}
              setSearchMessage={setSearchMessage}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
