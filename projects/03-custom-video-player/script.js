const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

// Play & Pause video
function toggleVideoStatus() {
    console.log('toggleVideoStatus');
    // Since video is a HTML5 tag, we can use attributes and methods from the video API
    video.paused ? video.play() : video.pause();
}

// Update Play/Pause Icon
function updatePlayIcon() {
    console.log('updatePlayIcon');
    play.innerHTML = video.paused ? '<i class="fa fa-play fa-2x"></i>' : '<i class="fa fa-pause fa-2x"></i>';
}

// Update Progress & Timestamp
function updateProgress() {
    console.log('updateProgress');
    // Progress bar
    progress.value = (video.currentTime / video.duration) * 100;

    // Timestamp
    // Get Minutes
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) minutes = '0' + String(minutes);
    // Get Seconds
    let seconds = Math.floor(video.currentTime % 60);
    if (seconds < 10) seconds = '0' + String(seconds);
    // Update Timestamp
    timestamp.innerHTML = `${minutes}:${seconds}`;
}

// Set video time to progress
function setVideoProgress() {
    console.log('setVideoProgress');
    video.currentTime = (progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
    console.log('stopVideo');
    video.currentTime = 0;
    video.pause();
}