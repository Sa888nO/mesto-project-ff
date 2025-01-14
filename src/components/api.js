const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
      authorization: '7ea56f3b-26da-418b-b0df-e3390d168a6e',
      'Content-Type': 'application/json'
    }
}

const paths = {
    me: config.baseUrl + "/users/me",
    cards: config.baseUrl + "/cards"
}

// Обработчик ответа от сервера
const handlingResponse = (res) => res.ok ? res.json() : Promise.reject('Статус ошибки: ' + res.status);

// Пишу свою обертку над fetch для предотвращения дублирования кода (установка headers и первичная обработка результата)
const customFetch = (url, options) => fetch(url, {
    ...options,
    headers: config.headers
}).then(handlingResponse);

// Методы профиля
const getProfile = () => customFetch(paths.me, {method: "GET"})

const updateProfile = (name, about) => customFetch(paths.me, {
    method: "PATCH",
    body: JSON.stringify({name, about}),
})

const getCards = () => customFetch(paths.cards, {method: "GET"})

export {
    getProfile,
    updateProfile,
    getCards
}