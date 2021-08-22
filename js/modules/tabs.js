function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    function hideTabsContent() {
        tabsContent.forEach(item => { // айтем -каждый мой отдельный блок,тексконтент
            item.classList.add('hide');
            item.classList.remove('show', 'fade'); //убирает класс с елемента тот,что в скобках
        }); //скрывает наши блоки

        tabs.forEach(item => {
            item.classList.remove(activeClass); //удаляем активность нашых блоков,класс актив даёт жирность табу
        })
    }


    function showTabContent(i = 0) { // i-номер елемента к которому мы оращаемся.Если функция вызывается без
        //аргумента,то по умолчанию становится 0
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabsContent();
    showTabContent(); //когда загрузилась картинка будет i=0.т.е первая картинка

    tabsParent.addEventListener('click', (event) => {
        const target = event.target //для удобства переменная создается,тут дежить нтмл елемент на который я нажала
        if (target && target.classList.contains(tabsSelector.slice(1))) { //проверяем нажали мы правильно на tabheader__item
            //а не на родителя и т.д
            /*  classList.contains-Проверяет, есть ли данный класс у элемента (вернет true или false)
            нам нужно выяснить под каким номером наш елемент,на который нажали,что бы потом передать его
            в функцию showTabContent(), что бы он отобразился на странице.Для этого использкем перебор всех табов-елементов
            форичем и если елемент в нашем псевдомасиве tabs совпадает с елементом на который кликнул пользователь,тогда мы берем
            его номер и показываем на странице*/

            tabs.forEach((item, i) => {
                /* итем-каждый наш таб,и-его порядковый номер*/
                if (target == item) { // если таргет-тот елемент на который кликнули равен итем-тому елементу,что перебирает форич
                    hideTabsContent();
                    showTabContent(i);
                }
            });

        }
    });
}

export default tabs;