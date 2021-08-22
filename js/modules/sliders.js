function sliders({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCaunter,
    wrapper,
    field
}) {
    //slaiders
    // const slaiders = document.querySelectorAll('.offer__slide'),//все слайды
    //     parentStrel=document.querySelectorAll('.offer__slider-counter')
    //     strelPrev = document.querySelector('.offer__slider-prev'),
    //     strelNext = document.querySelector('.offer__slider-next'),
    //     currentFirst = document.getElementById('current'),
    //         currentEnd = document.getElementById('total');

    // currentEnd.textContent = slaiders.length < 10?`0${slaiders.length}`:`${laiders.length}`
    // console.log(currentEnd)
    // let currentIndex = 0;
    // currentFirst.textContent = currentIndex+'1';

    //         function showSlaiders(index=0) {
    //     slaiders.forEach(function(item,i) {// айтем -каждый мой отдельный слайдер,i порядковый номер елемента
    //         item.classList.add('hide');
    //         item.classList.remove('show', 'fade');//убирает класс с елемента тот,что в скобках
    //         if (index === i) {
    //             item.classList.remove('hide');
    //             item.classList.add('show','fade')
    //         };
    //     });//скрывает наши блоки

    // };
    // showSlaiders();

    // parentStrel[0].addEventListener('click', (e) => {




    //     if (strelNext === e.target) {
    //         currentIndex = currentIndex + 1;
    //         if (currentIndex === slaiders.length) {
    //             currentIndex = 0;
    //         }
    //     }

    //     if (strelPrev === e.target) {
    //         currentIndex = currentIndex - 1;
    //         if (currentIndex < 0) {
    //             currentIndex = slaiders.length - 1
    //         }
    //     }

    //     showSlaiders(currentIndex);
    //     currentFirst.textContent = currentIndex < 9 ? `0${currentIndex + 1}` : `${currentIndex + 1}`

    // })




    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container), //див в котором и слайды и стрелочки и счетчики
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter), //уникальный индетнефикатор id
        current = document.querySelector(currentCaunter),
        slidessWrapper = document.querySelector(wrapper),
        slidessField = document.querySelector(field),
        width = window.getComputedStyle(slidessWrapper).width

    let slideIndex = 1;
    let offset = 0; //отступ

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidessField.style.width = 100 * slides.length + '%'; //устанавливаем ширину карусели как ширина 1дного слайда в процентах
    slidessField.style.display = 'flex';
    slidessField.style.transition = '0.5s all';
    slidessWrapper.style.overflow = 'hidden'; //cкрываем все еллементы,которые не попадают в область видимости

    slides.forEach(slide => {
        slide.style.width = width; //устанавливаем каждому отдельному слайду одинаковую ширину и слайд будет смещатся на определенную ширину
    });
    // точки

    slider.style.position = 'relative';
    //Относительное позиционирование сдвигает элемент относительно его обычного положения.
    //создать большую обвертку всех точек и как-то ее застилизовать
    const indicators = document.createElement('ol'), //родитель liшек.Нумерованный список
        dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15% ;
    margin-left: 15% ;
    `;
    slider.append(indicators);
    //далее основываясь на количестве слайдов создаем количество точек

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); //каждая наша точечка
        dot.setAttribute('data-slide-to', i + 1); //elem.setAttribute(name, value) – устанавливает атрибут
        //каждой точке устанавливает атрибут data-slide-to.т.е. к какому слайду будет относится и устанавливаем нумерацию с 1
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
        `
        if (i == 0) {
            dot.style.opacity = 1; //активность первой точки
        }
        indicators.append(dot) //после того,как мы заапендили нашу точку на страничку мы ее помещаем и в масив
        dots.push(dot)

    }; //когда наш цыкл отработает-создадутся наши точки

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    function namberFormat() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        };
    };

    function setActivDot() {
        dots.forEach(dot => dot.style.opacity = '.5'); ///50 проц
        dots[slideIndex - 1].style.opacity = 1;
    }




    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1))
            offset = 0;
        //если отступ равен ширине одного слайда умноженого на количество слайдов минус 1 бто устанавливает офсет - отступ в 0, тюе мы дошли до самого конца и нужно вернуться в самое начало offset = 0;
        else {
            offset += deleteNotDigits(width) //когда нажимем стрелочку вперёд к нашему офсету добавляется ширина еще одного слайла
        }
        //если это не последний слайд,то к офсету-отступк нужно добавить смещение и тоже конвертировать в число
        //отрезает три числа
        //в видс лежит сейчас строка такая 500px,к примеру,т.е. 2 лишних символа и умножить это на число недбзя
        //нужно их отрезать и перевести в значение

        slidessField.style.transform = `translateX(-${offset}px)`

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        namberFormat();
        setActivDot();

    })
    prev.addEventListener('click', () => {
        if (offset == 0) { //когда мы узнали,что у нас первый слайд
            offset = deleteNotDigits(width) * (slides.length - 1); //записутся в переменную оффсет мой последний слайд,который вычесляется таким образом
        } else {
            offset -= deleteNotDigits(width) //вдруг это не первый слайд,но нужно нам отнимать

        }

        slidessField.style.transform = `translateX(-${offset}px)` // смищение нашего слайда
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }
        setActivDot();

    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            //кликнули на 4ю точку,у нас тут 4 и соотвестветвенно слайдиндекс пойдет на 4

            offset = deleteNotDigits(width) * (slideTo - 1);

            slidessField.style.transform = `translateX(-${offset}px)`

            namberFormat();

            setActivDot();
        });

    });




    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide

    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });

}
export default sliders;