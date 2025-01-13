const openModal = (modal) => {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEsc);
}

const closeModal = (modal) => {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeByEsc);
}

const closeByEsc = () => {
    const popups = document.querySelectorAll(".popup");
    popups.forEach((popup) => popup.classList.contains("popup_is-opened") && closeModal(popup));
}

const closeModalByClickOverlay = (event) => event.currentTarget === event.target && closeModal(event.target);

export {
    openModal,
    closeModal,
    closeByEsc,
    closeModalByClickOverlay
}
