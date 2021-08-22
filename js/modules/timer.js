function timer(id, dedline) {
    //timer



    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), //перевод в милисикунды и отнимание

            //перевод милисикунд в количество дней,часов,минут,секунд
            days = Math.floor(t / (1000 * 60 * 60 * 24)), //1000*60=количество милисикунд в 1 минуте *60=ко-во милисек в 1м часе *24=ко-во мили сек в сутках.
            //Т.е. получаем количество суток до окончания даты '2020-05-11'
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), //Общее кол-во часов,которое осталось до нашего тамера '2020-05-11',
            //но,что бы ко-во часов было не боьше 24х как в сутках используем остаток отделения,и сам остаток это и будет ко-во нашых часов
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZiro(num) {

        if (num >= 0 && num < 10) {
            return `0${num}`
        } else
            return num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //запустится 1 раз и установит текущее время,а потом пойдет  timeInterval = setInterval((updateClock), 1000),

        function updateClock() {
            const t = getTimeRemaining(endTime); //ращет времени который остался прямо на эту секунду.
            //getTimeRemaining-возвращает объект

            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }

    }

    setClock(id, dedline);

}
export default timer;