import "./pages/index.css";
import initialCards from "./scripts/cards";
import {createNewCard, removeCard, toggleLikeCard} from "./components/card";
import {openModal, closeModal, closeModalByClickOverlay} from "./components/modal";

// Модальные окна 
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Поля imagePopup для заполнения
const imageModal = document.querySelector(".popup_type_image");
const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

// Контейнер для карточек
const placesContainer = document.querySelector(".places__list");

// Функциональные кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Данные профиля для подставления
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Формы для создания карточки и изменения профиляч 
const newCardForm = document.forms["new-place"];
const editProfileForm = document.forms["edit-profile"];

// Заполнение контента модального окна для карточки / функция вызова модального окна
const openCardImageModal = (name, link) => {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;

    openModal(imageModal);
}

const addNewCard = (event) => {
    event.preventDefault();
    const newCardData = {
        name: newCardForm.elements["place-name"].value,
        link: newCardForm.elements.link.value,
    };
    placesContainer.prepend(createNewCard(newCardData, removeCard, toggleLikeCard, openCardImageModal));
    
    closeModal(cardPopup);
}

const updateProfile = (event) => {
    event.preventDefault();
    profileTitle.textContent = editProfileForm.elements.name.value;
    profileDescription.textContent = editProfileForm.elements.description.value;
    
    closeModal(profilePopup);
}

// Открыть форму создания карточки предварительно сбросив данные введенные ранее
profileAddButton.addEventListener("click", () => {
    newCardForm.elements["place-name"].value = "";
    newCardForm.elements.link.value = "";

    openModal(cardPopup);
});

// Открыть и предворительно заполнить форму
profileEditButton.addEventListener("click", () => {
    editProfileForm.elements.name.value = profileTitle.textContent;
    editProfileForm.elements.description.value = profileDescription.textContent;

    openModal(profilePopup);
});

editProfileForm.addEventListener("submit", updateProfile);

newCardForm.addEventListener("submit", addNewCard);

[profilePopup ,cardPopup ,imagePopup].forEach(popup => {
    popup.querySelector(".popup__close").addEventListener("click", () => closeModal(popup));
    popup.addEventListener("click", closeModalByClickOverlay);
    popup.classList.add("popup_is-animated");
})

initialCards.forEach(cardData => placesContainer.append(createNewCard(cardData, removeCard, toggleLikeCard, openCardImageModal)));