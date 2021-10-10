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
      const animStart = 12;

      let itemAnimPoint = window.innerHeight - itemHeight / animStart;
      if (itemHeight > window.innerHeight) {
        itemAnimPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((scrollY > itemOffset - itemAnimPoint) && scrollY < (itemOffset + itemHeight)) {
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