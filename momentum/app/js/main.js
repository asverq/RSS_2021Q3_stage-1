const time = document.querySelector('.time');
const date = document.querySelector('.date');

let loc = 'RU';

const locFormat = {
    'EN': 'en-EN',
    'RU': 'ru-RU',
    'month': {
        'EN': [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        'RU': [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ]
    },
    'day': {
        'EN': [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        'RU': [
            'Воскресенье',
            'Понедельник',
            'Вторник',
            'Среда',
            'Четверг',
            'Пятница',
            'Суббота'
        ]
    }
}

function setDate() {
    let currentMonth = locFormat.month[loc][new Date().getMonth()];
    let currentWeekDay = locFormat.day[loc][new Date().getDay()];
    date.textContent = `${currentWeekDay}, ${currentMonth} ${new Date().getDate()}`
}

function showTime() {
    time.textContent = new Date().toLocaleTimeString(locFormat[loc]);
    setDate();
    setTimeout(showTime, 1000);
}
showTime();