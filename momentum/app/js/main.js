const body = document.querySelector('body');
const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const sliderBtns = document.querySelector('.slider-icons');

let loc = localStorage.getItem('locState') || 'EN';
let rndNumber = randomNum();

function randomNum(num = 20) {
  return Math.floor(Math.random() * num) + 1;
}

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
  },
  'namePlaceholder': {
    'EN': 'enter your name',
    'RU': 'введите ваше имя'
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
  if (loc === 'EN') {
    date.textContent = `${currentWeekDay}, ${currentMonth} ${new Date().getDate()}`;
  }
  if (loc === 'RU') {
    date.textContent = `${currentMonth}: ${new Date().getDate()} - ${currentWeekDay}`;
  }
}

function setGreeting() {
  const currTime = new Date().getHours();
  if (currTime >= 6 && currTime < 12) greeting.textContent = locFormat.timeOfDay[loc][0];
  if (currTime >= 12 && currTime < 18) greeting.textContent = locFormat.timeOfDay[loc][1];
  if (currTime >= 18 && currTime < 24) greeting.textContent = locFormat.timeOfDay[loc][2];
  if (currTime >= 0 && currTime < 6) greeting.textContent = locFormat.timeOfDay[loc][3];
}

function showTime() {
  time.textContent = new Date().toLocaleTimeString(); //locFormat[loc] - add this to enable local time format
  setDate();
  setGreeting();
  setTimeout(showTime, 1000);
}
showTime();

userName.addEventListener('input', () => {
  localStorage.setItem('userName', userName.value)
})

function setUsername() {
  userName.value = localStorage.getItem('userName') || locFormat.namePlaceholder[loc];
}
setUsername();


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
    setBg();
  }
  if (e.target === document.querySelector('.slide-next')) {
    if (rndNumber === 20) {
      rndNumber = 1;
    } else {
      rndNumber += 1;
    }
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


function setCityLang() {
  let cityLoc;
  loc === 'EN' ? cityLoc = 'Minsk' : cityLoc = 'Минск';
  city.value = localStorage.getItem('cityName') || cityLoc;
}
setCityLang();
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
  const error = document.querySelector('.weather-error');
  let windText;
  let humText;
  let errorText;
  if (loc === 'EN') {
    windText = 'Wind:';
    humText = 'Humidity:';
    errorText = 'city not found';
  }
  if (loc === 'RU') {
    windText = 'Ветер:';
    humText = 'Влажность:';
    errorText = 'город не найден'
  }
  data.cod === '404' ? error.textContent = errorText : error.textContent = '';
  error.style.color = '#790900';
  weatherIcon.setAttribute('class', `weather-icon owf owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.floor(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `${humText} ${data.main.humidity}%`;
  wind.textContent = `${windText} ${Math.floor(data.wind.speed)} m/s`;
}
getWeather();


const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let rotateDeg = 0;

changeQuote.addEventListener('click', getQuotes);

async function getQuotes() {
  rotateDeg += 180;
  changeQuote.style.transform = `rotate(${rotateDeg}deg)`;
  const quotes = `data${loc}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  const rndNum = randomNum() - 1;
  quote.textContent = data[rndNum].author;
  author.textContent = `"${data[rndNum].text}"`;
}
getQuotes();


const audio = new Audio();
const wrapBtn = document.querySelector('.player-controls');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const playBtn = document.querySelector('.play');
const playListContainer = document.querySelector('.play-list');

let currMedia = 0;

wrapBtn.addEventListener('click', actionMedia);

const playListArr = [{
    title: 'Aqua Caelestis',
    src: 'sounds/Aqua Caelestis.mp3'
  },
  {
    title: 'Ennio Morricone',
    src: 'sounds/Ennio Morricone.mp3'
  },
  {
    title: 'River Flows In You',
    src: 'sounds/River Flows In You.mp3'
  },
  {
    title: 'Summer Wind',
    src: 'sounds/Summer Wind.mp3'
  }
]

audio.src = `${playListArr[currMedia].src}`;

playListArr.forEach((el, index) => {
  const li = document.createElement('li');
  li.setAttribute('class', 'play-item');
  li.textContent = `${playListArr[index].title}`;
  playListContainer.append(li);
})

const playItems = document.querySelectorAll('.play-item');
playItems[currMedia].classList.add('item-active');

const currentMediaName = document.querySelector('.player-audio-name');
currentMediaName.textContent = `${playListArr[currMedia].title}`;

let isPlaying = false;

function actionMedia(e) {
  if (e.target === playBtn) {
    playPauseMedia();
  }

  if (e.target === nextBtn) {
    nextAudio();
  }

  if (e.target === prevBtn) {
    if (currMedia > 0) {
      currMedia -= 1;
    } else {
      currMedia = playListArr.length - 1;
    }
    if (isPlaying) {
      audio.src = `${playListArr[currMedia].src}`;
      audio.play();
    } else {
      audio.src = `${playListArr[currMedia].src}`;
    }
  }

  resetPlayListIcons()
  setPlayListIcons()

  currentMediaName.textContent = `${playListArr[currMedia].title}`;
}

function nextAudio() {
  if (currMedia < playListArr.length - 1) {
    currMedia += 1;
  } else {
    currMedia = 0;
  }
  if (isPlaying) {
    audio.src = `${playListArr[currMedia].src}`;
    audio.play();
  } else {
    audio.src = `${playListArr[currMedia].src}`;
  }
}

audio.addEventListener('ended', autoNextAudio);

function autoNextAudio() {
  if (isPlaying) {
    nextAudio();
    resetPlayListIcons();
    setPlayListIcons();
    currentMediaName.textContent = `${playListArr[currMedia].title}`;
  }
}

function resetPlayListIcons() {
  playItems.forEach(item => {
    item.classList.remove('item-active');
    item.style.background = 'url("svg/play.svg") left center no-repeat';
    item.style.backgroundSize = '20px';
  })
}

function setPlayListIcons() {
  playItems[currMedia].classList.add('item-active');
  if (isPlaying) {
    playItems[currMedia].style.background = 'url("svg/pause.svg") left center no-repeat';
    playItems[currMedia].style.backgroundSize = '20px';
  }
}

function playPauseMedia() {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    playBtn.classList.add('pause');
  } else {
    audio.pause();
    isPlaying = false;
    playBtn.classList.remove('pause');
  }
}

const playListItems = document.querySelectorAll('.play-item');

playListItems.forEach((item, index) => {
  item.addEventListener('click', playListAction);

  function playListAction(e) {
    if (currMedia !== index) {
      currMedia = index;
      audio.src = `${playListArr[currMedia].src}`;
      setTimeout(() => {
        audio.play();
        isPlaying = true;
        playBtn.classList.add('pause');
        item.style.background = 'url("svg/pause.svg") left center no-repeat';
        item.style.backgroundSize = '20px';
      }, 0);
    }
    resetPlayListIcons();
    item.classList.add('item-active');
    if (item.classList.contains('item-active') && isPlaying) {
      audio.pause();
      playBtn.classList.remove('pause');
      isPlaying = false;
      item.style.background = 'url("svg/play.svg") left center no-repeat';
      item.style.backgroundSize = '20px';
    } else {
      audio.play();
      isPlaying = true;
      playBtn.classList.add('pause');
      item.style.background = 'url("svg/pause.svg") left center no-repeat';
      item.style.backgroundSize = '20px';
    }
    currentMediaName.textContent = `${playListArr[currMedia].title}`;
  }
})


const progressAudio = document.querySelector('.player-duration');
const progressBarAudio = document.querySelector('.player-progress');

function setProgressBar(e) {
  const width = this.clientWidth;
  const offsetX = e.offsetX;
  audio.currentTime = `${offsetX / width * audio.duration}`
}
progressAudio.addEventListener('mousedown', setProgressBar);
progressAudio.addEventListener('mousedown', () => {
  progressAudio.addEventListener('mousemove', setProgressBar);
  document.addEventListener('mouseup', () => {
    progressAudio.removeEventListener('mousemove', setProgressBar);
  });
});

function updateProgressBar(e) {
  const {
    duration,
    currentTime
  } = e.target;
  progressBarAudio.style.width = `${currentTime / duration * 100}%`
  const cTime = Math.floor(currentTime / 60 * 100);
  const dTime = Math.floor(duration / 60 * 100);
  let minute = Math.floor(dTime / 60);
  let cMinute = Math.floor(cTime / 60);
  minute < 10 ? minute = `0${minute}` : minute = minute;
  cMinute < 10 ? cMinute = `0${cMinute}` : cMinute = cMinute;
  let sec = dTime % 60;
  let cSec = cTime % 60;
  sec < 10 ? sec = `0${sec}` : sec = sec;
  cSec < 10 ? cSec = `0${cSec}` : cSec = cSec;
  const audioDuration = document.querySelector('.player-audio-duration');
  if (!isNaN(duration)) {
    audioDuration.textContent = `${cMinute}:${cSec} / ${minute}:${sec}`;
  } else if (isNaN(duration)) {
    audioDuration.textContent = `00:00 / 00:00`;
  }
}

audio.addEventListener('timeupdate', updateProgressBar);

const volumeAudio = document.querySelector('.player-volume');
const volumeProgressAudio = document.querySelector('.volume-progress');

volumeAudio.addEventListener('mousedown', setVolumeBar);
volumeAudio.addEventListener('mousedown', () => {
  volumeAudio.addEventListener('mousemove', setVolumeBar);
  document.addEventListener('mouseup', () => {
    volumeAudio.removeEventListener('mousemove', setVolumeBar);
  });
});

let currVolume = audio.volume;
let currProgressVolume = 50;

function setVolumeBar(e) {
  audio.volume = e.offsetX / this.clientWidth;
  currVolume = audio.volume;
  volumeProgressAudio.style.width = `${e.offsetX / this.clientWidth * 100}%`;
  currProgressVolume = e.offsetX / this.clientWidth * 100;
  volumeBtn.classList.remove('mute');
}

audio.volume = 0.5;
volumeProgressAudio.style.width = `50%`;

const volumeBtn = document.querySelector('.player-volume-btn');

volumeBtn.addEventListener('click', toggleVolume);

function toggleVolume() {
  volumeBtn.classList.toggle('mute')
  if (volumeBtn.classList.contains('mute')) {
    audio.volume = 0;
    volumeProgressAudio.style.width = '0%';
  } else {
    audio.volume = currVolume;
    volumeProgressAudio.style.width = `${currProgressVolume}%`;
  }
}


//Settings

const settingWrap = document.querySelector('.settings-wrap');
const settingBtn = document.querySelector('.settings-btn');
const overlay = document.querySelector('.overlay');

settingBtn.addEventListener('click', () => {
  settingWrap.classList.add('active');
  overlay.classList.add('active');
})

overlay.addEventListener('click', () => {
  settingWrap.classList.remove('active');
  overlay.classList.remove('active');
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    settingWrap.classList.toggle('active');
    overlay.classList.toggle('active');
  }
})

const setEn = document.querySelector('#set-english');
setEn.addEventListener('change', (e) => {
  loc = 'EN';
  localStorage.setItem('locState', 'EN');
  render();
})
const setRu = document.querySelector('#set-russian');
setRu.addEventListener('change', (e) => {
  loc = 'RU';
  localStorage.setItem('locState', 'RU');
  render();
})

if (loc === 'EN') {
  setEn.setAttribute('checked', 'checked');
} else {
  setRu.setAttribute('checked', 'checked');
}

renderObject('player');
renderObject('time');
renderObject('date');
renderObject('greeting-container');
renderObject('weather');
renderObject('quote-container');

function renderObject(obj) {
  const object = document.querySelector(`.${obj}`);
  const checkObjState = document.querySelector(`#set-${obj}`);
  let objState = localStorage.getItem(`${obj}State`) || 'show';

  if (objState === 'show') {
    object.classList.add('active');
  } else {
    checkObjState.removeAttribute('checked');
  }

  checkObjState.addEventListener('change', renderObj);

  function renderObj() {
    if (objState === 'show') {
      checkObjState.removeAttribute('checked');
      object.classList.remove('active');
      localStorage.setItem(`${obj}State`, 'hide');
      objState = 'hide';
    } else {
      checkObjState.setAttribute('checked', 'checked');
      object.classList.add('active');
      localStorage.setItem(`${obj}State`, 'show');
      objState = 'show';
    }
  }
}

function render() {
  getQuotes();
  setCityLang();
  getWeather();
  setUsername();
  renderSettingsLang();
}

function renderSettingsLang() {
  const langText = document.querySelector('.lang-text');
  loc === 'EN' ? langText.textContent = 'Language:' : langText.textContent = 'Язык:';
  const blocksText = document.querySelector('.blocks-text');
  loc === 'EN' ? blocksText.textContent = 'show / hide blocks' : blocksText.textContent = 'показать / скрыть блоки';
  const playerText = document.querySelector('.player-text');
  loc === 'EN' ? playerText.textContent = 'Show Audio Player' : playerText.textContent = 'Показать Аудио Плеер';
  const timeText = document.querySelector('.time-text');
  loc === 'EN' ? timeText.textContent = 'Show Time' : timeText.textContent = 'Показать Время';
  const dateText = document.querySelector('.date-text');
  loc === 'EN' ? dateText.textContent = 'Show Date' : dateText.textContent = 'Показать Дату';
  const greetingText = document.querySelector('.greeting-text');
  loc === 'EN' ? greetingText.textContent = 'Show Greeting' : greetingText.textContent = 'Показать Приветствие';
  const weatherText = document.querySelector('.weather-text');
  loc === 'EN' ? weatherText.textContent = 'Show Weather' : weatherText.textContent = 'Показать Погоду';
  const quoteText = document.querySelector('.quote-text');
  loc === 'EN' ? quoteText.textContent = 'Show Quote' : quoteText.textContent = 'Показать Цитаты';
}
renderSettingsLang();


console.log(`
Приветствую!
Моя оценка 131 балл.

Настройки приложения можно открыть клавишей ESC, либо кликнуть иконку шестерёнки в нижнем левом углу экрана. Закрыть настройки - ESC, либо клик в любое место экрана кроме меню настроек.

ВЫПОЛНЕННЫЕ ПУНКТЫ ЗАДАНИЯ:

1) Часы и календарь (+15)
  время выводится в 24-часовом формате, например: 21:01:00 (+5)
  время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) (+5)
  выводится день недели, число, месяц (+5)

2) Приветствие (+10)
  текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) (+5)
  пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage (+5)

3) Смена фонового изображения (+20)
  Ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) (+5)
  изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.
  изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) (+5)
  изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) (+5)
  при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем:
  1) при загрузке и перезагрузке страницы
  2) при открытой консоли браузера
  3) при слишком частых кликах по стрелкам для смены изображения (+5)

4) Виджет погоды (+15)
  город по умолчанию - Минск, пока пользователь не ввёл другой город
  при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage (+5)
  для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API
  данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел (+5)
  выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (+5)

5) Виджет цитата дня (+10)
  при загрузке страницы приложения отображается рандомная цитата и её автор (+5)
  при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) (+5)

6) Аудиоплеер (+15)
  при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause (+3)
  при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play (+3)
  треки можно пролистывать кнопками Play-next и Play-prev
  треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) (+3)
  трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем (+3)
  после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. (+3)

7) Продвинутый аудиоплеер (реализуется без использования библиотек) (+20)
  добавлен прогресс-бар в котором отображается прогресс проигрывания (+3)
  при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека (+3)
  над прогресс-баром отображается название трека (+3)
  отображается текущее и общее время воспроизведения трека (+3)
  есть кнопка звука при клике по которой можно включить/отключить звук (+2)
  добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука (+3)
  можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте (+3)

8) Перевод приложения на два языка (en/ru или en/be) (+15)
  переводится язык и меняется формат отображения даты (+3)
  переводится приветствие и placeholder (+3)
  переводится прогноз погоды в т.ч описание погоды и город по умолчанию (+3)
  переводится цитата дня (+3)
  переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется (+3)
  не переводятся данные, которые вводит пользователь: имя, город, тег для получения фонового изображения от API

10) Настройки приложения (+11 из 20) - из-за отсутсвия получения изображений от API выполнено частично (невыполненные пункты перечислены ниже)
  в настройках приложения можно указать язык приложения (en/ru или en/be) (+3 )
  в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/
  скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их (+3)
  настройки приложения сохраняются при перезагрузке страницы (+5)


ИТОГО: 131 балл


НЕВЫПОЛНЕННЫЕ ПУНКТЫ:
10) Настройки приложения - три пункта из настроек не выполнены (-9 из 20)
  в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API (-3)
  если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото (-3)
  ваш собственный дополнительный функционал (-3)

9) Получение фонового изображения от API (-10)
  в качестве источника изображений может использоваться Unsplash API (-5)
  в качестве источника изображений может использоваться Flickr API (-5)

11) Дополнительный функционал на выбор (-10)
  Достаточно выполнить только один из предложенных пунктов на ваш выбор.
  ToDo List - список дел (как в оригинальном приложении)
  список ссылок (как в оригинальном приложении)
  свой собственный дополнительный функционал, по сложности аналогичный предложенным (-10)
`);