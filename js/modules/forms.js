import {
    closeModal,
    openModal,
} from './modal';

import {
    postData
} from '../services/services';

function forms(formSelector, ModalTimerId) {
    const forms = document.querySelectorAll(formSelector)
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо,скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindpostData(item)
    });



    function bindpostData(form) { //форм потому что на неё удобно поведить слушателя
        form.addEventListener('submit', (e) => { //сабмин используется при отправке формы,нажатием на кнопку или мишкой или ентером
            e.preventDefault(); //отменить перезагрузку страницы

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin:0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); //сформировали  веденные пользователем данные, в формате ключ-значение

            const json = JSON.stringify(Object.fromEntries(formData.entries())) //переводит в масив масивов,потом в обычный обьект,а после этого наш класический обект превращаем в джейсон


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);

                    statusMessage.remove() //удаляем наш спинер
                    showThanksModal(message.success);
                })
                .catch((e) => {
                    console.log(e);
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();

                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide'); // скпываем модальное окно
        openModal('.modal', ModalTimerId);

        const thenksModal = document.createElement('div');
        thenksModal.classList.add('modal__dialog');
        thenksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div></div>`; //этот меседж будут поставлятся из нашего обьекта меседж или саксес или лодах
        document.querySelector('.modal').append(thenksModal)

        setTimeout(() => {
            thenksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
    fetch('http://localhost:3000/menu') //возвращает промис
        .then(data => data.json()) //дата-это ответ от сервера и превращаем в обычный джс объект
        .then(res => console.log(res)) //рез-это результат который получится

}
export default forms;