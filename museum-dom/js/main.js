const owerlayBody = document.querySelector('.popup-owerlay-transparent');
const headerMenu = document.querySelector('.header-nav__sub-wrap');
const headerMenuLink = document.querySelectorAll('.header-nav__link');
const burger = document.querySelector('.header-nav__burger');
const burgerLine = document.querySelector('.line');
const welcomeSlogan = document.querySelector('.welcome__slogan-wrap');

burger.addEventListener('click', () => {
  headerMenu.classList.toggle('active');
  burgerLine.classList.toggle('active');
  welcomeSlogan.classList.toggle('active');
  owerlayBody.classList.toggle('active');
})

headerMenuLink.forEach(item => [
  item.addEventListener('click', () => {
    headerMenu.classList.remove('active');
    burgerLine.classList.remove('active');
    welcomeSlogan.classList.remove('active');
    owerlayBody.classList.remove('active');
  })
])
owerlayBody.addEventListener('click', () => {
  headerMenu.classList.remove('active');
  burgerLine.classList.remove('active');
  welcomeSlogan.classList.remove('active');
  owerlayBody.classList.remove('active');
})

//BA-Slider
const baSlider = document.querySelector('.ba-slider__owerlay');
const baSeparator = document.querySelector('.ba-slider__separator');
const baImgWrap = document.querySelector('.ba-slider__image-wrap');

baSlider.addEventListener('mousedown', moveStart);
document.addEventListener('mouseup', moveEnd);

function moveStart(e) {
  e.preventDefault();
  const baSliderWidth = +e.currentTarget.offsetWidth;
  const x = e.offsetX;
  if (x > 20 && x < (baSliderWidth - 20)) {
    baImgWrap.style.width = `${x}px`;
    baSeparator.style.left = `${x}px`;
    baSlider.addEventListener('mousemove', moveAction);
  }
}

function moveAction(e) {
  e.preventDefault();
  const baSliderWidth = +e.currentTarget.offsetWidth;
  const x = e.offsetX;
  if (x > 20 && x < (baSliderWidth - 20)) {
    baImgWrap.style.width = `${x}px`;
    baSeparator.style.left = `${x}px`;
  }
}

function moveEnd() {
  baSlider.removeEventListener('mousemove', moveAction);
}
//END__BA-Slider

//Random Gallery
const galleryImg = document.querySelectorAll('.gallery__img');
const rndArr = new Array(galleryImg.length).fill(1);

for (let i = 1; i < galleryImg.length; i++) {
  rndArr[i] = rndArr[i - 1] + 1;
}

shuffle(rndArr);

for (let x = 0; x < galleryImg.length; x++) {
  galleryImg[x].setAttribute('src', `img/gallery/gallery${rndArr[x]}.webp`);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
//END__Random Gallery

//Animation Gallery
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

const galleryItems = document.querySelectorAll('.gallery__item');

if (galleryItems.length > 0) {
  window.addEventListener('scroll', debounce(checkGalleryItems));

  function checkGalleryItems() {
    galleryItems.forEach(item => {
      const itemHeight = item.offsetHeight;
      const itemOffset = Math.floor(offset(item).top);
      const animStart = 10;

      let itemAnimPoint = window.innerHeight - itemHeight / animStart;
      if (itemHeight > window.innerHeight) {
        itemAnimPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > itemOffset - itemAnimPoint)) { // && scrollY < (itemOffset + itemHeight)
        item.classList.add('animate__animated');
        item.classList.add('animate__zoomIn');
        item.classList.add('active');
      } else {
        item.classList.remove('animate__animated');
        item.classList.remove('animate__zoomIn');
        item.classList.remove('active');
      }
    })
  }
  setInterval(checkGalleryItems, 500);

}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop
  }
}
//END__Animation Gallery

//Popup-form
const buyNowBtn = document.querySelector('.calculator-btn-sum');
const popupForm = document.querySelector('.tickets__popup-form');
const popupFormClose = document.querySelector('.popup-form__close-btn');
const popupOwerlay = document.querySelector('.popup-owerlay');
let isPopupOpen = false;
buyNowBtn.addEventListener('click', (e) => {
  e.preventDefault();
  isPopupOpen = true;
  popupForm.classList.remove('hide');
  popupOwerlay.classList.add('active');
})

popupFormClose.addEventListener('click', () => {
  isPopupOpen = false;
  popupForm.classList.add('hide');
  popupOwerlay.classList.remove('active');
})

popupOwerlay.addEventListener('click', () => {
  isPopupOpen = false;
  popupForm.classList.add('hide');
  popupOwerlay.classList.remove('active');
})
//END__Popup-form

//Ripple Effect
const bookBtn = document.querySelector('.result-card__button');

bookBtn.addEventListener('click', function (e) {
  const x = e.offsetX;
  const y = e.offsetY;
  const circle = document.createElement('span');

  circle.classList.add('circle');
  circle.style.top = y + 'px';
  circle.style.left = x + 'px';

  this.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
})
//END__Ripple Effect

//Calculator
const calcBasicInp = document.getElementById('calculator__number-1');
const calcSeniorInp = document.getElementById('calculator__number-2');
const popCalcBasicInp = document.getElementById('counter-set__number-1');
const popCalcSeniorInp = document.getElementById('counter-set__number-2');
const btnsCalc = document.querySelectorAll('.calculator-btn');
const popBtnsCalc = document.querySelectorAll('.counter-set__btn');
const labelsRadio = document.querySelectorAll('.calculator__ticket-type');
const calcRadio = document.querySelectorAll('.calculator__radio');
const calcTotalText = document.querySelector('.calculator__sum');
const selectPopup = document.querySelector('.popup-form__select');
const selectOption = document.querySelectorAll('.select__option');

let checkedRadio = 'permanent exhibition';
let calcMultiple = Number(localStorage.getItem('calcMultiple')) || 20;

labelsRadio.forEach(e => {
  e.addEventListener('click', (e) => {
    selectOption.forEach(e => e.removeAttribute('selected'));
    checkedRadio = e.target.previousElementSibling.value;
    if (checkedRadio.toLocaleLowerCase() === 'permanent exhibition') {
      toStorage(20, 'Permanent exhibition');
      selectOption[1].setAttribute('selected', 'selected')
    }
    if (checkedRadio.toLocaleLowerCase() === 'temporary exhibition') {
      toStorage(25, 'Temporary exhibition');
      selectOption[2].setAttribute('selected', 'selected')
    }
    if (checkedRadio.toLocaleLowerCase() === 'combined admission') {
      toStorage(40, 'Combined Admission');
      selectOption[3].setAttribute('selected', 'selected')
    }
    setTotalValue();
    document.querySelector('.result__type').innerText = `${checkedRadio}`
  });
})

selectPopup.addEventListener('input', (e) => {
  calcRadio.forEach(e => e.removeAttribute('checked'));
  if (selectPopup.value.toLocaleLowerCase() === 'permanent exhibition') {
    toStorage(20, 'Permanent exhibition')
    calcRadio[0].setAttribute('checked', 'checked');
    checkedRadio = 'Permanent exhibition';
  }
  if (selectPopup.value.toLocaleLowerCase() === 'temporary exhibition') {
    calcRadio[1].setAttribute('checked', 'checked');
    toStorage(25, 'Temporary exhibition')
    checkedRadio = 'Temporary exhibition';
  }
  if (selectPopup.value.toLocaleLowerCase() === 'combined admission') {
    calcRadio[2].setAttribute('checked', 'checked');
    toStorage(40, 'Combined Admission')
    checkedRadio = 'Combined Admission';
  }
  setTotalValue();
  document.querySelector('.result__type').innerText = `${checkedRadio}`
});

function toStorage(num, str) {
  localStorage.setItem('calcMultiple', num);
  localStorage.setItem('checkedRadio', str);
  calcMultiple = num;
}

btnsCalc.forEach(e => {
  e.addEventListener('click', () => {
    localStorage.setItem('valueCalcBasicInp', calcBasicInp.value);
    localStorage.setItem('valueCalcSeniorInp', calcSeniorInp.value);
    popCalcBasicInp.value = calcBasicInp.value;
    popCalcSeniorInp.value = calcSeniorInp.value;
    setTotalValue()
  })
})
popBtnsCalc.forEach(e => {
  e.addEventListener('click', () => {
    localStorage.setItem('valueCalcBasicInp', popCalcBasicInp.value);
    localStorage.setItem('valueCalcSeniorInp', popCalcSeniorInp.value);
    calcBasicInp.value = popCalcBasicInp.value;
    calcSeniorInp.value = popCalcSeniorInp.value;
    setTotalValue()
  })
})

function setTotalValue() {
  let sum = calcBasicInp.value * calcMultiple + (calcSeniorInp.value / 2) * calcMultiple
  calcTotalText.innerText = `${sum}`
  document.querySelector('.result__total-sum').innerText = `${sum}€`
  document.querySelector('.counter-set__text--basic')
    .innerText = `Basic 18+ (${calcMultiple} €)`
  document.querySelector('.result__type-text--basic')
    .innerHTML = `<span class="result__type-count">${popCalcBasicInp.value}</span>Basic (${calcMultiple} €)`
  document.querySelector('.result__type-text--basic-right')
    .innerHTML = `${popCalcBasicInp.value * calcMultiple} €`
  document.querySelector('.counter-set__text--senior')
    .innerText = `Senior 65+ (${calcMultiple / 2} €)`
  document.querySelector('.result__type-text--senior')
    .innerHTML = `<span class="result__type-count">${popCalcSeniorInp.value}</span>Senior (${calcMultiple / 2} €)`
  document.querySelector('.result__type-text--senior-right')
    .innerHTML = `${popCalcSeniorInp.value * (calcMultiple / 2)} €`
}

function setCalcInputValue() {
  calcBasicInp.value = Number(localStorage.getItem('valueCalcBasicInp'))
  calcSeniorInp.value = Number(localStorage.getItem('valueCalcSeniorInp'))
  popCalcBasicInp.value = Number(localStorage.getItem('valueCalcBasicInp'))
  popCalcSeniorInp.value = Number(localStorage.getItem('valueCalcSeniorInp'))
  setTotalValue();
}
setCalcInputValue();


function setRadio() {
  calcRadio.forEach(e => e.removeAttribute('checked'));
  selectOption.forEach(e => e.removeAttribute('selected'));
  if (calcMultiple === 20) {
    calcRadio[0].setAttribute('checked', 'checked');
    selectOption[1].setAttribute('selected', 'selected');
  }
  if (calcMultiple === 25) {
    calcRadio[1].setAttribute('checked', 'checked');
    selectOption[2].setAttribute('selected', 'selected');
  }
  if (calcMultiple === 40) {
    calcRadio[2].setAttribute('checked', 'checked');
    selectOption[3].setAttribute('selected', 'selected');
  }
  document.querySelector('.result__type').innerText = `${localStorage.getItem('checkedRadio')}`
}
setRadio();
//END___Calculator

const inputDate = document.querySelector('.popup-form__input-date');
const currentDate = new Date().toISOString().slice(0, 10); //2021-10-10 Friday, August 19
const resultDate = document.querySelector('.result__date');
inputDate.setAttribute('min', currentDate);

inputDate.addEventListener('input', () => {
  const weekArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayWeek = weekArr[new Date(inputDate.value).getDay()];
  const month = monthArr[new Date(inputDate.value).getMonth()];
  const day = new Date(inputDate.value).getDate();
  resultDate.innerText = `${dayWeek}, ${month} ${day}`;
})

const inputTime = document.querySelector('.popup-form__input-time');
inputTime.addEventListener('input', () => {
  document.querySelector('.result__time').innerText = inputTime.value
})

//Validate
const regName = /^([A-Za-z][A-Za-z]{2,14}$)|^([а-яА-ЯёЁ][а-яА-ЯёЁ]{2,14}$)/
const inputName = document.querySelector('.popup-form__input-name');
inputName.addEventListener('input', (e) => {
  e.preventDefault();
  const notValid = document.createElement('span');
  if (!regName.test(inputName.value)) {
    inputName.style.boxShadow = "0 0 5px 2px #710707"
    if (!document.querySelector('.popup-form__input-name+span')) {
      inputName.parentElement.appendChild(notValid);
      notValid.innerText = `Enter correct name`;
    }
  } else {
    inputName.style.boxShadow = "0 0 5px 2px #097107"
    if (document.querySelector('.popup-form__input-name+span')) {
      inputName.parentElement.removeChild(document.querySelector('.popup-form__input-name+span'));
    }
  }
})

const regMail = /^([-0-9_A-z]{3,15}@[A-z]{4,15}.[A-z]{2,})$/;
const inputMail = document.querySelector('.popup-form__input-email');
inputMail.addEventListener('input', (e) => {
  e.preventDefault();
  const notValid = document.createElement('span');
  if (!regMail.test(inputMail.value)) {
    inputMail.style.boxShadow = "0 0 5px 2px #710707"
    if (!document.querySelector('.popup-form__input-email+span')) {
      inputMail.parentElement.appendChild(notValid);
      notValid.innerText = `Enter correct email address`;
    }
  } else {
    inputMail.style.boxShadow = "0 0 5px 2px #097107"
    if (document.querySelector('.popup-form__input-email+span')) {
      inputMail.parentElement.removeChild(document.querySelector('.popup-form__input-email+span'));
    }
  }
})

const regPhone = /^((\d{2,3})?[- ]?(\d{2,3})[- ]?(\d{2,3})[- ]?(\d{2,3}))$/;
const inputPhone = document.querySelector('.popup-form__input-phone');
inputPhone.addEventListener('input', (e) => {
  e.preventDefault();
  const notValid = document.createElement('span');
  if (!regPhone.test(inputPhone.value)) {
    inputPhone.style.boxShadow = "0 0 5px 2px #710707"
    if (!document.querySelector('.popup-form__input-phone+span')) {
      inputPhone.parentElement.appendChild(notValid);
      notValid.innerText = `Enter correct phone number`;
    }
  } else {
    inputPhone.style.boxShadow = "0 0 5px 2px #097107"
    if (document.querySelector('.popup-form__input-phone+span')) {
      inputPhone.parentElement.removeChild(document.querySelector('.popup-form__input-phone+span'));
    }
  }
})

console.log(`
Моя оценка работы: 157 баллов

1) Слайдер в секции Welcome +24
  - есть возможность перелистывания слайдов влево и вправо кликами по стрелкам +4
  - есть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки +4
  - есть возможность перелистывания слайдов кликами по буллетам (квадратики внизу слайдера) +2
  - слайды перелистываются плавно с анимацией смещения вправо или влево +4
  - перелистывание слайдов бесконечное (зацикленное) +4
  - при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) +2
  - при перелистывании слайдов кликами или свайпами меняется номер активного слайда +2
  - даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2

2) Слайдер в секции Video +20
  - при клике по самому слайду или кнопке Play в центре слайда, внутри слайда проигрывается видео с YouTube. Никакие изменения с основным видео при этом не происходят +2
  - если видео с YouTube проигрывается, клик по кнопке Pause останавливает его проигрывание. Также проигрывание видео останавливается, если кликнуть по другому слайду или кнопке Play в центре другого слайда. В указанной ситуации другое видео должно запуститься, а текущее остановиться. Невозможно проигрывание нескольких YouTube видео одновременно
    Выполнено частично + 1

  - если внутри слайда проигрывается видео с YouTube, клик по стрелке перелистывания слайдов или клик по буллету останавливает проигрывание видео +2
  - есть возможность перелистывания слайдов влево и вправо кликами по стрелкам. Слайды перелистываются по одному, при этом также меняется основное видео +2
  - есть возможность перелистывания слайдов кликами по буллетам (кружочки внизу слайдера), при этом также меняется основное видео +2
  - слайды перелистываются плавно с анимацией смещения вправо или влево (для смены основного видео анимация смещения не требуется и не проверяется) +2
  - перелистывание слайдов бесконечное (зацикленное) +2
  - при перелистывании слайдов буллет активного слайда подсвечивается (выделяется стилем) +2
  - если основное видео проигрывалось при перелистывании слайдера, проигрывание видео останавливается, прогресс бар сдвигается к началу, иконки "Play" на панели управления и по центру видео меняются на первоначальные +2
  - даже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2

3) Кастомный видеоплеер +36
  - при клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается +4
  - при клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается +4
  - прогресс-бар отображает прогресс проигрывания видео +2
  - перетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео +2
  - если прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" +2
  - при клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) +2
  - при перемещении ползунка громкости звука изменяется громкость видео +2
  - если ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой +2
  - если при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой +2
  - при нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем +2
  - панель управления в полноэкранном режиме визуально выглядит так же, как на макете - кнопки равномерно распределены по всей ширине страницы, относительные размеры между кнопками и ползунками, а также относительные размеры самих кнопок остались прежними +2
  - управление плеером с клавиатуры. Горячие клавиши должны работать так же, как работают эти клавиши в YouTube видео +10 Клавиши и группы клавиш работают в русской и английской раскладке клавиатуры. При изменении скорости воспроизведения поверх видео появляется и исчезает число с текущим коэффициентом воспроизведения, как это происходит в YouTube видео
  - клавиша Пробел — пауза, при повторном нажатии - play +2
  - Клавиша M (англ) — отключение/включение звука +2
  - Клавиша F — включение/выключение полноэкранного режима +2
  - Клавиши SHIFT+, (англ) — ускорение воспроизведения ролика. +2
  - Клавиши SHIFT+. (англ) — замедление воспроизведения ролика +2

4) Слайдер сравнения изображений в секции Explore +10
  - ползунок можно перетягивать мышкой по горизонтали +2
  - ползунок никогда не выходит за границы картины +2
  - при перемещении ползунка справа налево плавно появляется нижняя картина +2
  - при перемещении ползунка слева направо плавно появляется верхняя картина +2
  - при обновлении страницы ползунок возвращается в исходное положение +2

5) Анимация при прокрутке изображений в секции Galery +8
  - при прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания. В качестве образца анимации используйте анимацию на сайте Лувра https://www.louvre.fr/ +4
  - если прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется +2
  - при обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется +2

6) Калькулятор продажи билетов в секции Tiskets +10
  - при изменении количества билетов Basic и Senior пересчитывается общая цена за них +4
  - у каждого типа билетов своя цена (20 €, 25 €, 40 € для Basic и половина этой стоимости для Senior). При изменении типа билета пересчитывается общая цена за них +4
  - при обновлении страницы сохраняется выбранное ранее количество билетов Basic и Senior, выбранный тип билета, общая цена за них +2

7) Калькулятор продажи билетов в форме продажи билетов +14
  - когда при клике по кнопке Buy now открывается форма, она уже содержит данные, указанные на странице сайта - количество билетов, их тип, общая цена за них +2
  - когда пользователь выбирает дату в форме слева, она отображается в билете справа +2
  - нельзя выбрать дату в прошлом +2
  - когда пользователь выбирает время в форме слева, оно отображается в билете справа +2
  - время можно выбирать с 9:00 до 18:00 с интервалом в 30 минут +2
  - можно изменить тип билета в поле Ticket type слева при этом меняется тип билета, цена билета и общая стоимость билетов справа +2
  - можно изменить количество билетов каждого типа в поле слева при этом меняется количество билетов и общая стоимость билетов справа +2

8) Валидация формы +16
  - валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы +4
  - валидация e-mail должна пропускать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв +4
  - валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр
    Выполнено частично +2

  - при попытке ввода в input невалидного значения, его граница подсвечивается красным, выводится текстовое предупреждение в человекочитаемом формате +4

9) Интерактивная карта в секции Contacts +12
  - в секции Contacts добавлена интерактивная карта +4
  - на карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету +4
  - стиль карты соответствует макету +4

10) Любой собственный дополнительный функционал, улучшающий качество проекта. Например, ночная тема, плавная смена изображений в блоке Tickets, всплывающее окно с информацией про картины и их авторов, кнопка прокрутки страницы вверх, возможность проголосовать за понравившиеся картины с сохранением данных в local storage, всё зависит от вашей фантазии и чувства вкуса. Для удобства проверки выполненный вами дополнительный функционал включите в самооценку, которую выведите в консоль браузера +10

  *****************************************

  !!!  В качестве дополнительного функционала реализован слайдер в секции Tickets, а также в видеоплеере выводятся названия видео, и сделан таймер отображающий время проигрывания видео

  *****************************************

  Проблема отображения картинки в слайдере секции Video мне известна, но дело в том, что картинки подгружаются автоматически с YouTube и проблема в том, что ютуб не сгенерировал картинку заствки для этого видео. Вставлять картинку костыль я посчитал не корректным, лучше всего эту проблему смог бы решить например сам заказчик сайта, решив проблему с видео в YouTube.

  Также, для вашего понимания, в работе используется слайдер Slick-slider который допускается к использованию в задании, и который сам по себе написан на библиотеке jQuery, если вы встретили где-либо в коде следы этой библиотеки, то знайте, что они относятся только к этому слайдеру и его настройкам, а весь функционал сайта я писал на чистом JavaScript, как того и требует задание.

`);
