const counter = document.querySelector('.counter__left');

$(function () {
  $('.welcome-slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 600,
    appendArrows: $('.welcome-slider__arrows-wrapper'),
    prevArrow: '<div class="welcome-slider__arrows arrow-left"></div>',
    nextArrow: '<div class="welcome-slider__arrows arrow-right"></div>',
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
    // autoplay: true,
    autoplaySpeed: 7000,
    speed: 600,
    // prevArrow: '<div class="welcome-slider__arrows arrow-left"></div>',
    // nextArrow: '<div class="welcome-slider__arrows arrow-right"></div>',
    appendArrows: $('.video-slider__dots-wrapper'),
    appendDots: $('.dots-subwrap'),
  });
});



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