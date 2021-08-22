'use ctrict'
function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
    this.hello = function () {
        console.log(`Hello${this.name}`)
    }
}
const ivan = new User("Ivan", 28)
const alex = new User('Alex', 20)
console.log(ivan)
console.log(alex)

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
`
container.innnerHtml += str;