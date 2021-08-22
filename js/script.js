import tabs from './modules/tabs';
import modal from './modules/modal';
import calck from './modules/calck';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import timer from './modules/timer';
import {
    openModal
} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const ModalTimerId = setTimeout(() => openModal('.modal', ModalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal');
    calck();
    cards();
    forms('form', ModalTimerId);
    sliders({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        currentCaunter: '#current'

    });
    timer('.timer', '2021 - 09 - 17');

});