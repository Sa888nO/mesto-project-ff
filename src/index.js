import "./pages/index.css";
import initialCards from "./scripts/cards";
import {
    placesContainer,
    createNewCard,
    removeCard
} from './components/card'

initialCards.forEach(cardData => placesContainer.append(createNewCard(cardData, removeCard)));