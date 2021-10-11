const
  container = document.querySelector('.video-player__container'),
  media = document.querySelector('.video-player__video'),
  controlsBody = document.querySelector('.controls-body'),
  controls = document.querySelector('.video-player__bar'),
  screenBtn = document.querySelector('.btn-on-screen'),
  playBtn = document.querySelector('.play-btn'),
  volumeBtn = document.querySelector('.btn-volume'),
  fullscreenBtn = document.querySelector('.btn-fullscreen'),
  volumeBar = document.querySelector(".volume-bar"),
  progressBar = document.querySelector(".progress-bar"),
  timerBar = document.querySelector(".timer"),
  videoTitle = document.querySelector('.video-title'),
  videoSpeed = document.querySelector('.video-player .speed'),
  videoSpeedDirection = document.querySelector('.video-player .speed-direction')

const mediaArr = [
  'Welcome to the Louvre - Bienvenue au Louvre - Musée du Louvre',
  'Au Louvre ! La Vénus de Milo',
  'Promenade dans les collections mésopotamiennes avec Ariane Thomas',
  "Exposition - Le Corps et l'Âme. De Donatello à Michel-Ange. Sculptures italiennes de la Renaissance",
  'Petits contes de Printemps - La ruse du Renard 🦊',
];

let activeMedia = 0;
let fullsreenMode = false;
let isPlaying = false;
let isPaused = false;

function setVideoTitle() {
  videoTitle.innerText = mediaArr[activeMedia];
}
setVideoTitle();

function setPlayerReady() {
  media.volume = volumeBar.value;
  volumeBar.style.background = `
    linear-gradient(
      to right,
      #710707 0%,
      #710707 ${volumeBar.value * 100}%,
      #C4C4C4 ${volumeBar.value * 100}%,
      #C4C4C4 100%
    )
  `;
}
setPlayerReady();

let isShiftDown = false;

media.addEventListener('ended', stopMedia);
media.addEventListener('click', playPauseMedia);
screenBtn.addEventListener('click', playPauseMedia);
playBtn.addEventListener('click', playPauseMedia);
volumeBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullScreen)


document.addEventListener('keydown', (e) => {
  const containerHeight = container.offsetHeight;
  const containerPoint = window.innerHeight - containerHeight / 2;
  const containerOffset = Math.floor(offset(container).top)

  if (scrollY > containerOffset - containerPoint &&
    scrollY < (containerOffset + containerHeight / 2)) {
    if (e.code === 'Space') {
      e.preventDefault();
      playPauseMedia();
    }
    if (e.code === 'KeyF') {
      e.preventDefault();
      toggleFullScreen();
    }
    if (e.code === 'KeyM') {
      e.preventDefault();
      toggleMute();
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      e.preventDefault();
      isShiftDown = true;
    }
    if (e.code === 'Period' && isShiftDown === true) {
      e.preventDefault();
      speedPlay('up');
    }
    if (e.code === 'Comma' && isShiftDown === true) {
      e.preventDefault();
      speedPlay('down');
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    e.preventDefault();
    isShiftDown = false;
  }
})


function offsetContainer(el) {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop
  }
}

function setMedia() {
  media.src = `video/video-${activeMedia + 1}.mp4`;
  media.poster = `video/poster${activeMedia}.jpg`;
  setVideoTitle();
  stopMedia();
  setTimeout(() => {
    progressBar.value = '0';
    progressBar.style.background = '#c4c4c4';
  }, 0)
}

function speedPlay(arg) {
  if (arg === 'up') {
    if (media.playbackRate < 2.5) {
      media.playbackRate += 0.25;
      videoSpeed.innerText = `${media.playbackRate}x`;
      videoSpeedDirection.innerText = `>>`;
      videoSpeed.style.display = "block"
      videoSpeedDirection.style.display = "block"
      setTimeout(videoSpeedTimeout, 1500);
    }
  }
  if (arg === 'down') {
    if (media.playbackRate > 0.25) {
      media.playbackRate -= 0.25;
      videoSpeed.innerText = `${media.playbackRate}x`;
      videoSpeedDirection.innerText = `<<`;
      videoSpeed.style.display = "block"
      videoSpeedDirection.style.display = "block"
      setTimeout(videoSpeedTimeout, 1500);
    }
  }

  function videoSpeedTimeout() {
    videoSpeed.style.display = "none"
    videoSpeedDirection.style.display = "none"
  }
}

document.addEventListener('fullscreenchange', setPlayerFullscreenStyles);

function setPlayerFullscreenStyles() {
  if (fullsreenMode === false) {
    controlsBody.classList.add('fullscreen');
    controls.classList.add('fullscreen');
    fullsreenMode = true;
  } else if (fullsreenMode === true) {
    controlsBody.classList.remove('fullscreen');
    controls.classList.remove('fullscreen');
    fullsreenMode = false;
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function playPauseMedia() {
  if (media.paused) {
    playBtn.children[0].setAttribute('class', '_icon-pause-btn icon');
    screenBtn.style.display = 'none';
    media.play();
    isPlaying = true;
    isPaused = false;
  } else {
    playBtn.children[0].setAttribute('class', '_icon-play-btn icon');
    screenBtn.style.display = 'block';
    media.pause();
    isPaused = true;
  }
}

function stopMedia() {
  media.currentTime = 0;
  playBtn.children[0].setAttribute('class', '_icon-play-btn icon');
  screenBtn.style.display = 'block';
  videoSpeed.innerText = '1x';
  isPlaying = false;
}

function toggleMute() {
  const tmpVol = media.volume;

  if (media.muted) {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn icon');
    media.muted = false;
    volumeBar.value = tmpVol;
    volumeBar.style.background = `
      linear-gradient(
        to right,
        #710707 0%,
        #710707 ${tmpVol * 100}%,
        #C4C4C4 ${tmpVol * 100}%,
        #C4C4C4 100%
      )
    `;
  } else {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn_mute icon');
    media.muted = true;
    volumeBar.value = '0';
    volumeBar.style.background = '#c4c4c4';
  }
}

//progress bar logics
media.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', liveSearchProgress);

function liveSearchProgress() {
  const value = this.value;
  media.currentTime = (value * media.duration) / 100;
  this.style.background = `
    linear-gradient(
      to right,
      #710707 0%,
      #710707 ${value}%,
      #C4C4C4 ${value}%,
      #C4C4C4 100%
    )
  `;
}

function timer() {
  const minutes = Math.floor(media.currentTime / 60);
  const hours = Math.floor(minutes / 60) % 24;
  const seconds = Math.floor(media.currentTime % 60);
  timerBar.innerText = `${
    String(hours).padStart('2', '0')
  }:${
    String(minutes).padStart('2', '0')
  }:${
    String(seconds).padStart('2', '0')
  }`;
}

function updateProgressBar() {
  const position = (media.currentTime / media.duration) * 100;
  progressBar.value = position;
  progressBar.style.background = `
    linear-gradient(
      to right,
      #710707 0%,
      #710707 ${position}%,
      #C4C4C4 ${position}%,
      #C4C4C4 100%
    )
  `;
  timer();
}

volumeBar.addEventListener("input", setVolume);

function setVolume() {
  const value = this.value;

  if (media.muted) {
    media.volume = 0;
    toggleMute();
  }

  if (+value === 0) {
    toggleMute();
  }

  media.volume = value;
  this.style.background = `
    linear-gradient(
      to right,
      #710707 0%,
      #710707 ${value * 100}%,
      #C4C4C4 ${value * 100}%,
      #C4C4C4 100%
    )
  `;
}

$('.video-slider').on('init', function (slick) { // <--- Данная обёртка от слайдера!!! остальной код на JS

  //Video SLIDER______________________________________
  function findVideos() {
    let videos = document.getElementsByClassName('video-slider__item-wrap');

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
    iframe.classList.add('media__frame');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&modestbranding=1&fs=0&controls=1&autoplay=1&showinfo=0&version=3&enablejsapi=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();

  //Video-slider logics
  const videoSliderItems = document.getElementsByClassName('video-slider__item');
  const videoSliderFrameItems = document.getElementsByClassName('media__frame');
  const videoSlickPrevArrow = document.querySelector('.video-slider__dots-wrapper .slick-prev.slick-arrow');
  const videoSlickNextArrow = document.querySelector('.video-slider__dots-wrapper .slick-next.slick-arrow');
  const videoSlickDots = document.querySelectorAll('.video-slider__dots-wrapper .slick-dots li');
  const blockVideoPlayer = document.querySelector('.video-player');

  for (let elem of videoSliderItems) {
    elem.addEventListener('click', () => {
      getFrameItem();
    })
  }
  videoSlickPrevArrow.addEventListener('click', () => {
    getFrameItem();
  })
  videoSlickNextArrow.addEventListener('click', () => {
    for (let item of videoSliderFrameItems) {
      item.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  })
  blockVideoPlayer.addEventListener('click', () => {
    getFrameItem();
  })
  videoSlickDots.forEach(e => {
    e.addEventListener('click', (e) => {
      getFrameItem();
    })
  })

  function getFrameItem() {
    for (let item of videoSliderFrameItems) {
      item.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  }

  //Slick slide method
  $('.video-slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    activeMedia = currentSlide;
    setMedia();
  });
  //END___Video SLIDER______________________________________
});