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

  checkGalleryItems();
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
buyNowBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popupForm.classList.remove('hide');
  popupOwerlay.classList.add('active');
})

popupFormClose.addEventListener('click', () => {
  popupForm.classList.add('hide');
  popupOwerlay.classList.remove('active');
})

popupOwerlay.addEventListener('click', () => {
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