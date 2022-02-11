import { MOVIES_API_URL, BASE_URL } from "../utils/constants";

class MainApi {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject({
      status: res.status,
    });
  }

  register({ password, email, name }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then(this._checkStatus);
  }

  login({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._checkStatus);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  patchUser(user) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify(user),
    }).then(this._checkStatus);
  }

  getMyMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkStatus);
  }

  postMyMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country ? movie.country : "Country",
        director: movie.director ? movie.director : "Unknown Director",
        duration: movie.duration,
        year: movie.year ? movie.year : "Unknown Year",
        description: movie.description ? movie.description : "Unknown Description",
        image: `${MOVIES_API_URL}${movie.image.url}`,
        thumbnail: `${MOVIES_API_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        movieId: movie.id.toString(),
        nameRU: movie.nameRU ? movie.nameRU : "RusName",
        nameEN: movie.nameEN ? movie.nameEN : "EngName",
      }),
    }).then(this._checkStatus);
  }

  deleteMyMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkStatus);
  }
}

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
