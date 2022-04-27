/** VARIABLES */
const $musicContainer = document.querySelector('#music-container');

const $playBtn = document.querySelector('#play');
const $previousBtn = document.querySelector('#previous');
const $nextBtn = document.querySelector('#next');

const $audio = document.querySelector('#audio');
const $progressBar = document.querySelector('#progress');
const $progressContainer = document.querySelector('#progress-container');
const $title = document.querySelector('#title');
const $cover = document.querySelector('#cover');

const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 2;

/** EVENTS */
$playBtn.addEventListener('click', () => {
    const isPlaying = $musicContainer.classList.contains('play');
    if (isPlaying) return pauseSong();
    playSong();
});

$previousBtn.addEventListener('click', prevSong);
$nextBtn.addEventListener('click', nextSong);

$audio.addEventListener('timeupdate', updateProgressBar);

$progressContainer.addEventListener('click', setProgressBar);

$audio.addEventListener('ended', nextSong);

/** LOGIC FUNCTIONS */
function loadSong(song) {
    $title.textContent = capitalize(song);
    $audio.src = `music/${song}.mp3`;
    $cover.src = `img/${song}.jpg`;
}

function playSong() {
    $musicContainer.classList.add('play');
    $playBtn.querySelector('i.fas').classList.remove('fa-play');
    $playBtn.querySelector('i.fas').classList.add('fa-pause');

    $audio.play();
}

function pauseSong() {
    $musicContainer.classList.remove('play');
    $playBtn.querySelector('i.fas').classList.add('fa-play');
    $playBtn.querySelector('i.fas').classList.remove('fa-pause');

    $audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length -1;

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) songIndex = 0;

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    $progressBar.style.width = `${progressPercent}%`;
}

function setProgressBar(e) {
    const progessContainerWidth = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / progessContainerWidth) * duration;
}

/** UI FUNCTIONS */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/** APP INIT */
loadSong(songs[songIndex]);