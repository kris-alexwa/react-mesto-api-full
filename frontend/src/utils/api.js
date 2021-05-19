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
     getInitialCards(token) {
         return fetch(this._url + "/cards", {
                 headers: {...this.headers, 'Authorization': `Bearer ${token}` }
             })
             .then(this._checkResponse)
     }

     //Загрузка информации о пользователе с сервера
     getUserInfo(token) {
         return fetch(this._url + "/users/me", {
                 headers: {...this.headers, 'Authorization': `Bearer ${token}` }
             })
             .then(this._checkResponse)
     }

     //Редактировать профиль
     editProfile(data, token) {
         return fetch(this._url + "/users/me", {
                 method: 'PATCH',
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                 body: JSON.stringify({
                     name: data.name,
                     about: data.about
                 })
             })
             .then(this._checkResponse)
     }

     //Добавление новой карточки
     saveNewCard(data, token) {
         return fetch(this._url + "/cards", {
                 method: "POST",
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                 body: JSON.stringify(data)
             })
             .then(this._checkResponse)
     }

     deleteCard(id, token) {
         return fetch(this._url + "/cards/" + id, {
                 method: "DELETE",
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
             })
             .then(this._checkResponse)
     }

     likeCard(id, token) {
         return fetch(this._url + "/cards/" + id + "/likes/", {
                 method: "PUT",
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
             })
             .then(this._checkResponse)
     }

     deleteLikeCard(id, token) {
         return fetch(this._url + "/cards/" + id + "/likes/", {
                 method: "DELETE",
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
             })
             .then(this._checkResponse)
     }

     updateUserAvatar(avatarLink, token) {
         return fetch(this._url + "/users/me/avatar", {
                 method: 'PATCH',
                 headers: {...this.headers, 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                 body: JSON.stringify({ avatar: avatarLink })
             })
             .then(this._checkResponse)
     }
 }

export const api = new Api({ url: 'https://api.mesto-kris.nomoredomains.monster' })
//  export const api = new Api({ url: 'http://localhost:5000' })