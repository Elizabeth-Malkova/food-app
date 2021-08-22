function openModal(modallSelector, ModalTimerId) {
    const modal = document.querySelector(modallSelector);

    modal.classList.add('show');
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'; //убиранием скрол на странице под модальным окном

    console.log(ModalTimerId)

    if (ModalTimerId) {
        clearInterval(ModalTimerId)
    }
}

function closeModal(modallSelector) {
    const modal = document.querySelector(modallSelector);

    modal.classList.add('hide');
    modal.classList.remove('show')
    document.body.style.overflow = ''; //востанавливаем скрол,после закрытия модального окна

}

function modal(triggerSelector, modallSelector, ModalTimerId) {
    const modaTriger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modallSelector);

    modaTriger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modallSelector, ModalTimerId))

    })

    modal.addEventListener('click', (e) => {
        console.log(e)
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modallSelector)
        }
    })
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modallSelector)
        }
    });



    function showByModalScrol() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modallSelector, ModalTimerId)
            window.removeEventListener("scroll", showByModalScrol)
        }
    }
    window.addEventListener('scroll', showByModalScrol);
}
export default modal;
export {
    closeModal
};
export {
    openModal
};