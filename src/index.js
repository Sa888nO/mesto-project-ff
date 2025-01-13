import "./pages/index.css";
import initialCards from "./scripts/cards";
import {
    createNewCard,
    removeCard
} from './components/card'

// Контейнер для карточек
const placesContainer = document.querySelector('.places__list');

initialCards.forEach(cardData => placesContainer.append(createNewCard(cardData, removeCard)));