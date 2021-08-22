import {
    getResource
} from '../services/services';

function cards() {
    /*class Card{
             constructor(url, title, desc, price) {
                 this.url = url;
                 this.title = title;
                 this.desc = desc;
                 this.price = price;
             }
             showCard() {
                 const container = document.querySelector('.menu__field .container')
                 const str =
                     `<div class="menu__item">
                     <img src="${this.url}" alt="vegy" />
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.desc}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                         <div class="menu__item-cost">Цена:</div>
                         <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                     </div>
                 </div>
                 `;
                 container.insertAdjacentHTML('beforeend', str);
             }
         }

         const card1 = new Card('img/tabs/vegy.jpg','Меню "Фитнес"',`Меню "Фитнес" - это новый подход к приготовлению блюд: больше
                   свежих овощей и фруктов. Продукт активных и здоровых людей. Это
                   абсолютно новый продукт с оптимальной ценой и высоким качеством!`,229);
         
         const card2 = new Card('img/tabs/elite.jpg','Меню “Премиум”',`В меню “Премиум” мы используем не только красивый дизайн упаковки,
                   но и качественное исполнение блюд. Красная рыба, морепродукты,
                   фрукты - ресторанное меню без похода в ресторан!`,'550');
         
         const card3 = new Card('img/tabs/post.jpg','Меню "Постное"',`Меню “Постное” - это тщательный подбор ингредиентов: полное
                   отсутствие продуктов животного происхождения, молоко из миндаля,
                   овса, кокоса или гречки, правильное количество белков за счет тофу
                   и импортных вегетарианских стейков.`,'430');
         
         card1.showCard()
         card2.showCard()
         card3.showCard()

         //используем классы для карточек*/

    class MenuCard {
        constructor(src, alt, title, desc, price, parentSelector, ...clases) { // не известно сколько класов добавится,то используем рест оператор ...
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.desc = desc;
            this.price = price;
            this.clases = clases; //масив 
            this.parent = document.querySelector(parentSelector) //дом-елемент который будем использовать
            this.transfer = 27; //курс гривны к долару
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div')
            if (this.clases.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.clases.forEach(ClassName => element.classList.add(ClassName)); //Класс нейм-елеиент масива
            }


            element.innerHTML =
                `<img src="${this.src}" alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.desc}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element)

        }
    }


    axios.get(`http://localhost:3000/menu`)
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => { //обджек,потому что каждая наша карточка-оюбект состоит из обьектов внутири,название свойств обекта для локаничности кода
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); //.menu.container-то куда это пушится, этот конструктор будет создаваться столько раз сколько обектов будет приходить из сервера
            });
        }); //первая дата -это обьект,с общей информацией,которую получили от сервера,а 2-я дата именно то что пришло от сервера
    //только карточки 
}
export default cards;