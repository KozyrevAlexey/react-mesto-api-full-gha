// import { apiConfig } from "./utils"

class Api {
  // constructor(config) {
  //   this._url = config.url;
  //   this._headers = config.headers;
  //   this._authorization = config.headers['authorization'];
  //   this._credentials = config.credentials;
  // }
    constructor({baseUrl}) {
      this._baseUrl = baseUrl;
    }

  /**Проверить на ошибки */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Упс.... Что-то пошло не так! Ошибка: ${res.status}`);
  };

  /**Запросить данные с сервера */
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      // headers: {
      //   authorization: this._authorization
      // },
      // headers: this._headers,
      // credentials: this._credentials
      method: 'GET',
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(res => this._checkResponse(res))
  }

  /**Функция добавления новой карточки на сервер */
  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      //
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(res => this._checkResponse(res))
  };

  /**Функция получения данных пользователя с сервера*/
  getUserInfoApi() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      // headers: {
      //   authorization: this._authorization
      // },
      // headers: this._headers,
      // credentials: this._credentails,
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(res => this._checkResponse(res))
  }

  /**Функция передачи данных пользователя с сервера */
  setUserInfoApi(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      credentials: this._credentails,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(res => this._checkResponse(res))
  }

  /**Функция передачи на сервер нового аватара */
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      // headers: this._headers,
      // credentials: this._credentails,
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(res => this._checkResponse(res))
  }

  /**Функция удаления карточки с сервера */
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      // headers: this._headers,
      // credentials: this._credentails,
      headers: {
        "Contint-Type": "application/json",
        autorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(res => this._checkResponse(res))
  }

  /**Функция переключения лайка */
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: 'DELETE',
        // headers: this._headers,
        // credentials: this._credentails,
        headers: {
          "Contint-Type": "application/json",
          autorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        credentials: 'include'
      })
        .then(res => this._checkResponse(res))
    } else {
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: 'PUT',
        // headers: this._headers,
        // credentials: this._credentails,
        headers: {
          "Contint-Type": "application/json",
          autorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        credentials: 'include'
      })
        .then(res => this._checkResponse(res))
    }
  }

}

// export const api = new Api(apiConfig);
export const api = new Api({baseUrl: 'http://localhost:3000/'});
