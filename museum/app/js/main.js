const counter = document.querySelector('.counter__left');

$(function () {
  $('.welcome-slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 600,
    appendArrows: $('.welcome-slider__arrows-wrapper'),
    prevArrow: '<button class="welcome-slider__arrows arrow-left"></button>',
    nextArrow: '<button class="welcome-slider__arrows arrow-right"></button>',
    appendDots: $('.welcome-slider__dots'),
  });
});

$('.welcome-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
  counter.innerText = `0${currentSlide + 1}`
});

$(function () {
  $('.video-slider').slick({
    slidesToShow: 3,
    infinite: true,
    dots: true,
    autoplaySpeed: 7000,
    speed: 600,
    appendArrows: $('.video-slider__dots-wrapper'),
    appendDots: $('.dots-subwrap'),
  });
});


//Video-Player
const progress = document.querySelector(".progress-bar");

progress.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
});

const progress2 = document.querySelector(".volume-bar");

progress2.addEventListener("input", function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
});
//END___Video-Player


//Random Gallery
const galleryImg = document.querySelectorAll('.gallery__img');
const rndArr = new Array(galleryImg.length).fill(1);

for (let i = 1; i < galleryImg.length; i++) {
  rndArr[i] = rndArr[i - 1] + 1;
}

shuffle(rndArr);

for (let x = 0; x < galleryImg.length; x++) {
  galleryImg[x].setAttribute('src', `img/gallery/gallery${rndArr[x]}.jpg`);
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
//END__Random Gallery


//BA-Slider
const
  baSlider = document.querySelector('.ba-slider'),
  baSeparator = document.querySelector('.ba-slider__separator')

let
  baImgWrap = document.querySelector('.ba-slider__image-wrap')

baSlider.addEventListener('mousedown', moveStart, false);
baSlider.addEventListener('mouseup', moveEnd, false);

let baPosX

function moveStart(e) {
  console.dir(e.target);
  e.preventDefault();
  baPosX = e.offsetX
  baImgWrap.style.width = `${baPosX}px`
  baSeparator.style.left = `${baPosX}px`
  baSlider.addEventListener('mousemove', moveAction);
}

function moveAction(e) {
  e.preventDefault();
  baPosX = e.offsetX
  baImgWrap.style.width = `${baPosX}px`
  baSeparator.style.left = `${baPosX}px`
}

function moveEnd() {
  baSlider.removeEventListener('mousemove', moveAction);
}
//END__BA-Slider

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