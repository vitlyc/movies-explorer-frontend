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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const [sendingRequest, setSendingRequest] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [foundAllMovies, setFoundAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const navigate = useNavigate();


  function handleLogin(data) {
    setSendingRequest(true);
    return mainApi
      .login(data)
      .then((res) => {
        checkToken();
        setAuthMessage("");
        setIsLoggedIn(true);
        setFoundAllMovies([]);
        navigate("/movies");
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
        setCurrentUser(res);
        setIsLoggedIn(true);
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
        // setAllMovies([]);
        // setSavedMovies([]);
        // setFoundSavedMovies([]);
        // foundSavedMovies([])
        localStorage.clear();
        
        navigate("/");
      })
      .catch(console.log);
  }

  function findMoviesByKeywords(movies, searchRequest) {
    if (searchRequest.length < 2) {
      setSearchMessage("Введите минимум два символа");
      const foundMovies =[]
      return foundMovies;
    }
    const foundMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchRequest.toLowerCase())
    );
    if (foundMovies.length === 0) {
      setSearchMessage("Ничего не найдено");
    }
    
    return foundMovies;
   
  }
  
  function handleSavedMovieSearchFormSubmit(shortMovie, location) {
    const searchRequest = shortMovie.reqText;
    handleSaveRequest(shortMovie, location);
    setSearchMessage("");
    setSavedMovies(findMoviesByKeywords(savedMovies, searchRequest));
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
  function handleMovieSearchFormSubmit(shortMovie, location) {
    handleSaveRequest(shortMovie, location);
    const searchRequest = shortMovie.reqText;
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

  function handleSaveRequest(shortMovie, location) {
    if (shortMovie.reqText.length < 2) return;
    if (location.pathname === "/movies") {
      localStorage.setItem("moviesRequest", JSON.stringify(shortMovie));
    } else {
      localStorage.setItem("savedMoviesRequest", JSON.stringify(shortMovie));
    }
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
    // localStorage.clear();
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
        <Route
          path="/movies"
          isLoggedIn={isLoggedIn}
          element={
            <ProtectedRoute
              Component={Movies}
              isLoggedIn={isLoggedIn}
              movies={foundAllMovies}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
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
          isLoggedIn={isLoggedIn}
          element={
            <ProtectedRoute
              Component={SavedMovies}
              isLoggedIn={isLoggedIn}
              movies={savedMovies}
              savedMovies={savedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              onSearch={handleSavedMovieSearchFormSubmit}
              searchMessage={searchMessage}
              setSearchMessage={setSearchMessage}
            />
          }
        />

        <Route
          path="/signup"
          element={
            <ProtectedRoute
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
            <ProtectedRoute
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
