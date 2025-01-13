// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
const createNewCard = (data, removeCardFunction, toggleLikeCardFunction) => {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true)
    const deleteButton = newCard.querySelector('.card__delete-button')
    const likeButton = newCard.querySelector('.card__like-button')

    newCard.querySelector('.card__image').src = data.link;
    newCard.querySelector('.card__image').alt = data.name;
    newCard.querySelector('.card__title').textContent = data.name;

    deleteButton.addEventListener('click', () => removeCardFunction(newCard))
    likeButton.addEventListener('click', () => toggleLikeCardFunction(likeButton))

    return newCard;
}

// Функция удаления карточки
const removeCard = (card) => card.remove();

// Функция добавления лайка карточке
const toggleLikeCard = (cardLikeButton) => cardLikeButton.classList.toggle('card__like-button_is-active');


export {
    createNewCard,
    removeCard,
    toggleLikeCard
}