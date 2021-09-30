const
  container = document.querySelector('.video-player__container'),
  media = document.querySelector('.video-player__video'),
  controlsBody = document.querySelector('.controls-body'),
  controls = document.querySelector('.video-player__bar'),
  screenBtn = document.querySelector('.btn-on-screen'),
  playBtn = document.querySelector('.play-btn'),
  rwdBtn = document.querySelector('.prev-btn'),
  fwdBtn = document.querySelector('.next-btn'),
  volumeBtn = document.querySelector('.btn-volume'),
  fullscreenBtn = document.querySelector('.btn-fullscreen'),
  volumeBar = document.querySelector(".volume-bar"),
  progressBar = document.querySelector(".progress-bar"),
  timerBar = document.querySelector(".timer"),
  speedBar = document.querySelector(".speed"),
  videoTitle = document.querySelector('.video-title')

const mediaArr = [
  'video-1',
  'video-2',
  'video-3',
  'video-4',
  'video-5',
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
media.addEventListener('ended', autoNextMedia);
media.addEventListener('click', playPauseMedia);
screenBtn.addEventListener('click', playPauseMedia);
rwdBtn.addEventListener('click', function () {
  changeMedia('rwd')
});
fwdBtn.addEventListener('click', function () {
  changeMedia('fwd')
});
playBtn.addEventListener('click', playPauseMedia);
volumeBtn.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullScreen)
document.addEventListener('keydown', (e) => {
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
});

document.addEventListener('keyup', (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    e.preventDefault();
    isShiftDown = false;
  }
})

function changeMedia(order) {
  if (order === 'rwd') {
    if (activeMedia > 0) {
      activeMedia -= 1;
      media.src = `video/video-${activeMedia + 1}.mp4`;
      setVideoTitle();
      if (isPlaying && !isPaused) {
        playPauseMedia();
        return;
      }
      setTimeout(() => {
        progressBar.value = '0';
        progressBar.style.background = '#c4c4c4';
      }, 0)
    }
  } else if (order === 'fwd') {
    if (activeMedia < mediaArr.length - 1) {
      activeMedia += 1;
      media.src = `video/video-${activeMedia + 1}.mp4`;
      setVideoTitle();
      if (isPlaying && !isPaused) {
        playPauseMedia();
        return;
      }
      setTimeout(() => {
        progressBar.value = '0';
        progressBar.style.background = '#c4c4c4';
      }, 0)
    }
  }
}

function speedPlay(arg) {
  if (arg === 'up') {
    if (media.playbackRate < 2.5) {
      media.playbackRate += 0.25;
      speedBar.innerText = `${media.playbackRate}x`;
    }
  }
  if (arg === 'down') {
    if (media.playbackRate > 0.25) {
      media.playbackRate -= 0.25;
      speedBar.innerText = `${media.playbackRate}x`;
    }
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
  speedBar.innerText = '1x';
  isPlaying = false;
}

function autoNextMedia() {
  if (activeMedia === mediaArr.length - 1) {
    stopMedia();
    return;
  }
  changeMedia('fwd');
  playPauseMedia();
}

function toggleMute() {
  if (media.muted) {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn icon');
    media.muted = false;
  } else {
    volumeBtn.children[0].setAttribute('class', '_icon-volume-btn_mute icon');
    media.muted = true;
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
