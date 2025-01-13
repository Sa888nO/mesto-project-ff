const openModal = (modal) => {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeByEsc);
}

const closeModal = (modal) => {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeByEsc);
}

const closeByEsc = (event) => event.key === "Escape" && closeModal(document.querySelector(".popup_is-opened"));

const closeModalByClickOverlay = (event) => event.currentTarget === event.target && closeModal(event.target);

export {
    openModal,
    closeModal,
    closeByEsc,
    closeModalByClickOverlay
}
