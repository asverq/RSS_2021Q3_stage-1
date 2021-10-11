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

const counter = document.querySelector('.counter__left');
$('.welcome-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
  counter.innerText = `0${currentSlide + 1}`
});

$(function () {
  $('.video-slider').slick({
    slidesToShow: 3,
    infinite: true,
    dots: true,
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

$(function () {
  $('.tickets__slider').slick({
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    arrows: false,
  });
});