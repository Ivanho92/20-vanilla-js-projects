/** VARIABLES */
const $word = document.querySelector('#word');
const $text = document.querySelector('#text');

const $score = document.querySelector('#score');
const $time = document.querySelector('#time');

const $settingsBtn = document.querySelector('#settings-btn');
const $settingsPanel = document.querySelector('#settings');
const $settingsForm = document.querySelector('#settings-form');
const $difficultySelect = document.querySelector('#difficulty');

const $endGameContainer = document.querySelector('#end-game-container');

let words;
let randomWord;
let difficulty = localStorage.getItem('difficulty') || 'normal';
let score = 0;
let time = 10;

const timeIncrement = {
    'easy': 4,
    'normal': 3,
    'hard': 2
};

const timeInterval = setInterval(updateTime, 1000);

/** EVENTS */
$text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        e.target.value = '';
        $word.textContent = '';

        setTimeout(drawNewWord, 75);
        updateScore();

        time += timeIncrement[difficulty];
        updateTime();
    }
});

$settingsBtn.addEventListener('click', toggleSettingsPanel);

$settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})

/** LOGIC FUNCTIONS */
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function updateTime() {
    time--;
    $time.textContent = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);
        endGame();
    }
}

function endGame() {
    $endGameContainer.innerHTML = `
        <h2>Game over!</h2>
        <p>Your final score is ${score}</p>
        <button id="reset-btn" class="reset-btn">Start again</button>
    `;

    $endGameContainer.classList.add('show');

    const $resetBtn = document.querySelector('#reset-btn');
    $resetBtn.addEventListener('click', restartGame);
    $resetBtn.focus();
}

/** UI FUNCTIONS */
function drawNewWord() {
    randomWord = getRandomWord();
    $word.textContent = randomWord;
}

function updateScore() {
    score++;
    $score.textContent = score;
}

function toggleSettingsPanel() {
    $settingsPanel.classList.toggle('show');
    if ($difficultySelect.getAttribute('tabindex') == -1)
        return $difficultySelect.setAttribute('tabindex', 0);
        $difficultySelect.setAttribute('tabindex', -1);
}

function restartGame() {
    location.reload();
}

/** API FETCH */
async function api__fetchRandomWords() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?number=100');
        const words = await response.json();
        return words;
    } catch (error) {
        console.error(error);
    }
}

/** APP INIT */
(async function init() {
    window.onload = () => document.body.classList.remove('preload'); // Removes animation prevent on page load
    $difficultySelect.value = difficulty;
    $text.focus();

    words = await api__fetchRandomWords();
    drawNewWord();
})();