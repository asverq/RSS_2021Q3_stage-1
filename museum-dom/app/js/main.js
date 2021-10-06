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
    responsive: [{
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
      }
    }, ],
  });
});

//You-tube_video

function findVideos() {
  let videos = document.querySelectorAll('.video-slider__item-wrap');

  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideos();

//END___You-tube_video

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

console.log(`
Моя самоопроверка:

Выполненные пункты:___________________________________________________________________

Вёрстка соответствует макету. Ширина экрана 1024px +40
  Блок header +4
  Секция Welcome +4
  Секция Visiting +4
  Секция Explore +4
  Секция Video +4
  Секция Gallery +4
  Секция Tickets +4
  Форма покупки билетов +4
  Секция Contacts +4
  Блок footer +4

Вёрстка соответствует макету. Ширина экрана 768px +40
  Блок header +4
  Секция Welcome +4
  Секция Visiting +4
  Секция Explore +4
  Секция Video +4
  Секция Gallery +4
  Секция Tickets +4
  Форма покупки билетов +4
  Секция Contacts +4
  Блок footer +4

Вёрстка соответствует макету. Ширина экрана 420px +40
  Блок header +4
  Секция Welcome +4
  Секция Visiting +4
  Секция Explore +4
  Секция Video +4
  Секция Gallery +4
  Секция Tickets +4
  Форма покупки билетов +4
  Секция Contacts +4
  Блок footer +4

Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6

Совмещается адаптивная и респонсивная (резиновая) вёрстка +14 При изменении ширины экрана плавно изменяются размеры:
  слайдера в секции Welcome +2
  слайдера сравнения изображений в секции Explore +2
  кастомного видеоплеера в секции Video +2
  слайдера в секции Video +2
  YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2
  галереи изображений и изображений в ней +2
  карты +2

На ширине экрана 1024рх и меньше реализовано адаптивное меню +12
  при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2
  ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2
  при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2
  вёрстка меню соответствует макету на всех проверяемых разрешениях +6

Не выполненные пункты:_______________________________________________________________

Оптимизация скорости загрузки страницы +8 Оптимизация скорости загрузки страницы определяется при помощи сервиса https://developers.google.com/speed/pagespeed/insights/. Результат проверки скорости сайта для мобильных устройств:
  0 to 49 (red): Poor - не выполнено, 0 баллов
  50 to 89 (orange): Needs Improvement - частично выполнено +4
  90 to 100 (green): Good - выполнено полностью +8


Итого, по подсчёту баллов выполненных пунктов: 150 баллов из возможных 150
`);