// Getting DOM into variables
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// Variables
let words;
let selectedWord;
let correctLetters = [];
let wrongLetters = [];

// EventHandlers
window.addEventListener('keydown', e => {
  if ( (/^[a-z]$/).test(e.key) ) {
    const char = e.key;
    if (selectedWord.includes(char)) {
      if (!correctLetters.includes(char)) {
        correctLetters.push(char);
        displayWord();
        checkWinConditions();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(char)) {
        wrongLetters.push(char);
        displayWrongLetters();
        drawFigureParts();
        checkWinConditions();
      } else {
        showNotification();
      }
    }
  }
})

playAgainBtn.addEventListener('click', resetGame);

// UI Functions
function displayWord() {
  wordEl.innerHTML = selectedWord
    .split("")
    .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`)
    .join("");
}

function displayWrongLetters() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
  `
}

function drawFigureParts() {
  figureParts.forEach( (part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
}

function showNotification() {
  if (!notification.classList.contains('show')) {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
  }
}

// Logic Functions 
function resetGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  correctLetters = [];
  wrongLetters = [];

  displayWord();
  displayWrongLetters();
  drawFigureParts();

  finalMessage.innerText = "";
  popup.classList.remove('show');
}

function checkWinConditions() {
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations. You won! 🥳";
    popup.classList.add('show');
    playAgainBtn.focus();
  }
  
  if (wrongLetters.length >= figureParts.length) {
    finalMessage.innerHTML = `
      You lost! 😕<br>
      Word was : <em>${selectedWord}</em>
    `;
    popup.classList.add('show');
    playAgainBtn.focus();
  }
}

// API Get random word
async function getWords() {
  const res = await fetch('https://random-word-api.herokuapp.com/word?number=100');
  const words = await res.json();
  return words;
}

// App init
getWords()
  .then(data => {
    words = data;
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
  })
  .catch(error => console.error(error));