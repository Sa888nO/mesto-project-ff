import {cardLike, cardCancelLike, deleteCard} from "./api";
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const createNewCard = (data, ownerID, removeCardFunction, toggleLikeCardFunction, openCardImageModalFunction) => {
    const newCard = cardTemplate.querySelector(".card").cloneNode(true)
    const deleteButton = newCard.querySelector(".card__delete-button")
    const likeButton = newCard.querySelector(".card__like-button")
    const cardImage = newCard.querySelector(".card__image")
    const cardTitle = newCard.querySelector(".card__title")
    const cardLikesTotal = newCard.querySelector(".card__likes-total")

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;
    cardLikesTotal.textContent = data.likes.length;
    
    if (data.owner._id === ownerID) deleteButton.addEventListener("click", () => removeCardFunction(newCard, data._id))
    else deleteButton.remove();
    
    if (data.likes.some(like => like._id === ownerID)) likeButton.classList.add("card__like-button_is-active");

    likeButton.addEventListener("click", () => toggleLikeCardFunction(likeButton, data._id, cardLikesTotal))

    cardImage.addEventListener(("click"), () => openCardImageModalFunction(data.name, data.link))

    return newCard;
}

// Функция удаления карточки
const removeCard = (cardElement, cardID) => deleteCard(cardID)
    .then(() => cardElement.remove())
    .catch(error => console.error(error))

// Функция добавления/удаления лайка карточке
const toggleLikeCard = (likeButton, cardID, cardLikesTotal) => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
        cardCancelLike(cardID)
            .then(card => {
                cardLikesTotal.textContent = card.likes.length
                likeButton.classList.remove("card__like-button_is-active");
            })
            .catch(error => console.error(error))
        }    
    else {
        cardLike(cardID)
            .then(card => {
                cardLikesTotal.textContent = card.likes.length
                likeButton.classList.add("card__like-button_is-active");
            })
            .catch(error => console.error(error))
    }
}

export {
    createNewCard,
    removeCard,
    toggleLikeCard,
}