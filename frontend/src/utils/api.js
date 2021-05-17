 export default class Api {
     constructor(options) {
         this._url = options.url;
         this.headers = options.headers;
         this.likeCard = this.likeCard.bind(this);
         this.deleteLikeCard = this.deleteLikeCard.bind(this);
     }

     _checkResponse(res) {
         if (res.ok) {
             return res.json();
         }
         return Promise.reject(`Ошибка ${res.status}`);
     }

     //Загрузка карточек с сервера
     getInitialCards() {
         return fetch(this._url + "/cards", {
                 headers: this.headers
             })
             .then(this._checkResponse)
     }

     //Загрузка информации о пользователе с сервера
     getUserInfo() {
         return fetch(this._url + "/users/me", {
                 headers: this.headers
             })
             .then(this._checkResponse)
     }

     //Редактировать профиль
     editProfile(data) {
         return fetch(this._url + "/users/me", {
                 method: 'PATCH',
                 headers: {...this.headers, 'Content-Type': 'application/json' },
                 body: JSON.stringify({
                     name: data.name,
                     about: data.about
                 })
             })
             .then(this._checkResponse)
     }

     //Добавление новой карточки
     saveNewCard(data) {
         return fetch(this._url + "/cards", {
                 method: "POST",
                 headers: {...this.headers, 'Content-Type': 'application/json' },
                 body: JSON.stringify(data)
             })
             .then(this._checkResponse)
     }

     deleteCard(id) {
         return fetch(this._url + "/cards/" + id, {
                 method: "DELETE",
                 headers: {...this.headers, 'Content-Type': 'application/json' },
             })
             .then(this._checkResponse)
     }

     likeCard(id) {
         return fetch(this._url + "/cards/likes/" + id, {
                 method: "PUT",
                 headers: {...this.headers, 'Content-Type': 'application/json' },
             })
             .then(this._checkResponse)
     }

     deleteLikeCard(id) {
         return fetch(this._url + "/cards/likes/" + id, {
                 method: "DELETE",
                 headers: {...this.headers, 'Content-Type': 'application/json' },
             })
             .then(this._checkResponse)
     }

     updateUserAvatar(avatarLink) {
         return fetch(this._url + "/users/me/avatar", {
                 method: 'PATCH',
                 headers: {...this.headers, 'Content-Type': 'application/json' },
                 body: JSON.stringify({ avatar: avatarLink })
             })
             .then(this._checkResponse)
     }
 }

 export const api = new Api({ url: 'https://api.mesto-kris.nomoredomains.monster' })