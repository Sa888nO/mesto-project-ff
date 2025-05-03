import "./pages/index.css";
import {createNewCard, removeCard, toggleLikeCard} from "./components/card";
import {openModal, closeModal, closeModalByClickOverlay} from "./components/modal";
import {getCards, getProfile, updateProfile as updateProfileApi, createCard as createCardApi, updateAvatar as updateAvatarApi} from "./components/api";
import {clearValidation, enableValidation, config} from './components/validation'

// Модальные окна 
const popups = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopup = document.querySelector(".popup_type_new-avatar");

// Поля imagePopup для заполнения
const modalImage = document.querySelector(".popup__image");
const modalCaption = document.querySelector(".popup__caption");

// Контейнер для карточек
const placesContainer = document.querySelector(".places__list");

// Функциональные кнопки
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const avatarEditButton = document.querySelector(".profile__image");

// Данные профиля для подставления
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

// Формы для создания карточки, изменения профиля, изменения аватара
const newCardForm = document.forms["new-place"];
const editProfileForm = document.forms["edit-profile"];
const editAvatarForm = document.forms["new-avatar"];

// Action кнопки форм
const newCardSumbitButton = document.forms["new-place"].querySelector('.popup__button');
const editProfileSumbitButton = document.forms["edit-profile"].querySelector('.popup__button');
const editAvatarSumbitButton = document.forms["new-avatar"].querySelector('.popup__button');

// Получение данных пользователя и карточек + добавление к карточкам с id пользователя возможности удаления
Promise.all(([getProfile(), getCards()]))
    .then(([profile, cards]) => {
        profileTitle.textContent = profile.name;
        profileDescription.textContent = profile.about;
        profileImage.src = profile.avatar;
        profileImage.alt = profile.name;

        cards.forEach(cardData => placesContainer.append(createNewCard(cardData, profile._id, removeCard, toggleLikeCard, openCardImageModal)));
    })
    .catch(error => console.error(error))

// Заполнение контента модального окна для карточки / функция вызова модального окна
const openCardImageModal = (name, link) => {
    modalImage.src = link;
    modalImage.alt = name;
    modalCaption.textContent = name;

    openModal(imagePopup);
}

const addNewCard = (event) => {
    event.preventDefault();
    newCardSumbitButton.textContent = "Сохранение..."
    const name = newCardForm.elements["place-name"].value;
    const link = newCardForm.elements.link.value;
    createCardApi(name, link)
        .then(newCardData => {
            placesContainer.prepend(createNewCard(newCardData, newCardData.owner._id, removeCard, toggleLikeCard, openCardImageModal));
            closeModal(cardPopup);
        })
        .catch(error => console.error(error))
        .finally(() => {
            newCardSumbitButton.textContent = "Сохранить"
        })
}

const updateProfile = (event) => {
    event.preventDefault();
    editProfileSumbitButton.textContent = "Сохранение..."
    const name = editProfileForm.elements.name.value
    const about = editProfileForm.elements.description.value
    updateProfileApi(name, about)
        .then(profile => {
            profileTitle.textContent = profile.name;
            profileDescription.textContent = profile.about;
            closeModal(profilePopup);
        })
        .catch(error => console.error(error))
        .finally(() => {
            editProfileSumbitButton.textContent = "Сохранить"
        })
}

const updateAvatar = (event) => {
    event.preventDefault();
    editAvatarSumbitButton.textContent = "Сохранение..."
    const avatarUrl = editAvatarForm.elements.avatar.value
    updateAvatarApi(avatarUrl)
        .then(profile => {
            profileImage.src = profile.avatar;
            closeModal(avatarPopup);
        })
        .catch(error => console.error(error))
        .finally(() => {
            editAvatarSumbitButton.textContent = "Сохранить"
        })
}

profileAddButton.addEventListener("click", () => {
    newCardForm.elements["place-name"].value = "";
    newCardForm.elements.link.value = "";
    clearValidation(newCardForm, config);
    openModal(cardPopup);
});

profileEditButton.addEventListener("click", () => {
    editProfileForm.elements.name.value = profileTitle.textContent;
    editProfileForm.elements.description.value = profileDescription.textContent;
    clearValidation(editProfileForm, config);
    openModal(profilePopup);
});

avatarEditButton.addEventListener("click", () => {
    editAvatarForm.elements.avatar.value = "";
    clearValidation(editAvatarForm, config);
    openModal(avatarPopup);
});


editProfileForm.addEventListener("submit", updateProfile);

newCardForm.addEventListener("submit", addNewCard);

editAvatarForm.addEventListener("submit", updateAvatar);

popups.forEach(popup => {
    popup.querySelector(".popup__close").addEventListener("click", () => closeModal(popup));
    popup.addEventListener("click", closeModalByClickOverlay);
    popup.classList.add("popup_is-animated");
})

enableValidation(config)