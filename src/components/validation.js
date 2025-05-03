const showInputError = (popupFormElement, popupInput, errorMessage, config) => {
    const formError = popupFormElement.querySelector(`.${popupInput.id}-input-error`);
    popupInput.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);
};

const hideInputError = (popupFormElement, popupInput, config) => {
    const formError = popupFormElement.querySelector(`.${popupInput.id}-input-error`);
    popupInput.classList.remove(config.inputErrorClass);
    if (formError) {
        formError.classList.remove(config.errorClass);
        formError.textContent = '';
    }
};

const isValid = (popupFormElement, popupInput, config) => {
    popupInput.setCustomValidity(popupInput.validity.patternMismatch ? popupInput.dataset.errorMessage : "");
    !popupInput.validity.valid ? showInputError(popupFormElement, popupInput, popupInput.validationMessage, config) : hideInputError(popupFormElement, popupInput, config);
};

const setEventListeners = (popupFormElement, config) => {
    const inputList = Array.from(popupFormElement.querySelectorAll('input'));
    const buttonElement = popupFormElement.querySelector(config.buttonElement);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
            isValid(popupFormElement, popupInput, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (config) => {
    Array.from(document.querySelectorAll((config.popupFormElement))).forEach((popupFormElement) => setEventListeners(popupFormElement, config));
};

const toggleButtonState = (inputList, buttonElement) => {
    if (inputList.some((input) => !input.validity.valid)) {
        buttonElement.disabled = true;
        buttonElement.classList.add("popup__button_disabled");
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove("popup__button_disabled");
    }
};

const clearValidation = (popupFormElement, config) => {
    const inputList = Array.from(popupFormElement.querySelectorAll(config.popupInput));
    const buttonElement = popupFormElement.querySelector(config.buttonElement);
    inputList.forEach((popupInput) => hideInputError(popupFormElement, popupInput, config))
    toggleButtonState(inputList, buttonElement);
};

const config = ({
    popupFormElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: '.popup__button_disabled',
    inputErrorClass: 'form__input_unvalid',
    errorClass: 'form__input-error_active'
});

export {
    enableValidation,
    clearValidation,
    config
};