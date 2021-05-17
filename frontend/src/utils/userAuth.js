export const BASE_URL = 'https://api.mesto-kris.nomoredomains.monster';

//вернет объект data с полями _id и email
//вернет 400 если некорректно заполнено одно из полей
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password, email: email })
        })
        .then(checkResponse);
}

//вернет токен
//вернет 400 если не передано одно из полей, 401 - пользователь с email не найден
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(checkResponse)
        .then((data) => {
            localStorage.setItem('token', data.token)
            return data
        })
}

//вернет _id и email
//вернет 401 если некорректный токен
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(checkResponse);
}

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)