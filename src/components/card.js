// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const createNewCard = (data, removeCardFunction, toggleLikeCardFunction, openCardImageModalFunction) => {
    const newCard = cardTemplate.querySelector(".card").cloneNode(true)
    const deleteButton = newCard.querySelector(".card__delete-button")
    const likeButton = newCard.querySelector(".card__like-button")
    const cardImage = newCard.querySelector(".card__image")
    const cardTitle = newCard.querySelector(".card__title")

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    deleteButton.addEventListener("click", () => removeCardFunction(newCard))
    likeButton.addEventListener("click", () => toggleLikeCardFunction(likeButton))
    cardImage.addEventListener(("click"), () => openCardImageModalFunction(data.name, data.link))

    return newCard;
}

// Функция удаления карточки
const removeCard = (card) => card.remove();

// Функция добавления лайка карточке
const toggleLikeCard = (cardLikeButton) => cardLikeButton.classList.toggle("card__like-button_is-active");

export {
    createNewCard,
    removeCard,
    toggleLikeCard,
}