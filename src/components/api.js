const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
      authorization: '7ea56f3b-26da-418b-b0df-e3390d168a6e',
      'Content-Type': 'application/json'
    }
}

const paths = {
    me: config.baseUrl + "/users/me",
    meAvatar: config.baseUrl + "/users/me/avatar",
    cards: config.baseUrl + "/cards",
    card: (cardID) => config.baseUrl + "/cards/" + cardID,
    cardLike: (cardID) => config.baseUrl + "/cards/likes/" + cardID,
}

// Обработчик ответа от сервера
const handlingResponse = (res) => res.ok ? res.json() : Promise.reject("Ошибка: " + res.status);;

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

const updateAvatar = (avatar) => customFetch(paths.meAvatar, {
    method: "PATCH",
    body: JSON.stringify({avatar})
})

// Методы карточек
const getCards = () => customFetch(paths.cards, {method: "GET"})

const createCard = (name, link) => customFetch(paths.cards, {
    method: "POST",
    body: JSON.stringify({name, link}),
})

const deleteCard = (cardID) => customFetch(paths.card(cardID), {method: "DELETE"})

const cardLike = (cardID) => customFetch(paths.cardLike(cardID), {method: "PUT"})

const cardCancelLike = (cardID) => customFetch(paths.cardLike(cardID), {method: "DELETE"})

export {
    getProfile,
    updateProfile,
    updateAvatar,
    getCards,
    createCard,
    deleteCard,
    cardLike,
    cardCancelLike
}