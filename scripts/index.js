// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createNewCard = (data, removeCardFunction) => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  newCard.querySelector('.card__image').src = data.link;
  newCard.querySelector('.card__image').alt = data.name;
  newCard.querySelector('.card__title').textContent = data.name;

  newCard.querySelector('.card__delete-button').addEventListener('click', () => removeCardFunction(newCard))

  return newCard;
}

// @todo: Функция удаления карточки
const removeCard = (card) => card.remove();

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => placesContainer.append(createNewCard(cardData, removeCard)));