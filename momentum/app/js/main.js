const body = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const sliderBtns = document.querySelector('.slider-icons');

let loc = 'RU';
let rndNumber;

function randomNum() {
  rndNumber = Math.floor(Math.random() * 20) + 1;
}
randomNum();

const locFormat = {
  'EN': 'en-EN',
  'RU': 'ru-RU',
  'month': {
    'EN': [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    'RU': [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
  },
  'day': {
    'EN': [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ],
    'RU': [
      'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
      'Четверг', 'Пятница', 'Суббота'
    ]
  },
  'timeOfDay': {
    'EN': [
      'Good morning',
      'Good afternoon',
      'Good evening',
      'Good night'
    ],
    'RU': [
      'Доброе утро',
      'Добрый день',
      'Добрый вечер',
      'Доброй ночи'
    ]
  }
}

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

function setDate() {
  let currentMonth = locFormat.month[loc][new Date().getMonth()];
  let currentWeekDay = locFormat.day[loc][new Date().getDay()];
  date.textContent = `${currentWeekDay}, ${currentMonth} ${new Date().getDate()}`;
}

function setGreeting() {
  const currTime = new Date().getHours();
  if (currTime >= 6 && currTime < 12) greeting.textContent = locFormat.timeOfDay[loc][0];
  if (currTime >= 12 && currTime < 18) greeting.textContent = locFormat.timeOfDay[loc][1];
  if (currTime >= 18 && currTime < 24) greeting.textContent = locFormat.timeOfDay[loc][2];
  if (currTime >= 0 && currTime < 6) greeting.textContent = locFormat.timeOfDay[loc][3];
}

function showTime() {
  time.textContent = new Date().toLocaleTimeString(locFormat[loc]);
  setDate();
  setGreeting();
  setTimeout(showTime, 1000);
}
showTime();

userName.addEventListener('input', () => {
  localStorage.setItem('userName', userName.value)
})

if (localStorage.getItem('userName')) {
  userName.value = localStorage.getItem('userName');
}

sliderBtns.addEventListener('click', debounce(changeSlide, 700));

function getDayTime() {
  const currTime = new Date().getHours();
  if (currTime >= 6 && currTime < 12) return 'morning';
  if (currTime >= 12 && currTime < 18) return 'afternoon';
  if (currTime >= 18 && currTime < 24) return 'evening';
  if (currTime >= 0 && currTime < 6) return 'night';
}

function changeSlide(e) {
  if (e.target === document.querySelector('.slide-prev')) {
    if (rndNumber === 1) {
      rndNumber = 20;
    } else {
      rndNumber -= 1;
    }
    console.log(rndNumber);
    setBg();
  }
  if (e.target === document.querySelector('.slide-next')) {
    if (rndNumber === 20) {
      rndNumber = 1;
    } else {
      rndNumber += 1;
    }
    console.log(rndNumber);
    setBg();
  }
}

function setBg() {
  let bgNum;
  rndNumber < 10 ? bgNum = `0${rndNumber}` : bgNum = `${rndNumber}`;
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/asverq/stage1-tasks/assets/images/${getDayTime()}/compressed/${bgNum}.webp`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}
setBg();


const city = document.querySelector('.city');
city.value = localStorage.getItem('cityName') || 'Minsk';
city.addEventListener('input', () => {
  localStorage.setItem('cityName', city.value);
})
city.addEventListener('change', () => {
  getWeather();
})

async function getWeather() {
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${loc}&appid=4f3d4c8677eb4347b67403f7237cf8f2&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  let windText;
  let humText;
  if (loc === 'EN') {
    windText = 'Wind:';
    humText = 'Humidity:'
  }
  if (loc === 'RU') {
    windText = 'Ветер:';
    humText = 'Влажность:'
  }

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${humText} ${data.main.humidity}%`;
  wind.textContent = `${windText} ${data.wind.speed} m/s`;
}
getWeather();

// async function getWeather() {
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=4f3d4c8677eb4347b67403f7237cf8f2&units=metric`;
//   const res = await fetch(url);
//   const data = await res.json();
//   // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
//   console.log(data);
// }
// getWeather();
