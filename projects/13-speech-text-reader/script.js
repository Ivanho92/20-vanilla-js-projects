/** VARIABLES */
const $main = document.querySelector('main');
const $voicesSelect = document.querySelector('#voices');
const $textBoxContainer = document.querySelector('#text-box-container');
const $textBox = document.querySelector('#text-box');
const $textarea = document.querySelector('#text');
const $readBtn = document.querySelector('#read');
const $toggleBtn = document.querySelector('#toggle');
const $closeBtn = document.querySelector('#close');

let voices = [];
const message = new SpeechSynthesisUtterance();

/** EVENTS */
speechSynthesis.addEventListener('voiceschanged', getVoices);

/** LOGIC FUNCTIONS */
function getVoices() {
    voices = speechSynthesis.getVoices();
        
    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.textContent = `${voice.name}`;

        $voicesSelect.appendChild(option);
    })
}

function setTextMessage(text) {
    message.text = text;
}

function speakText() {
    speechSynthesis.speak(message);
}

function setVoice(el) {
    message.voice = voices.find(voice => voice.name == el.value);
}

function readCustomText() {
    setTextMessage($textarea.value);
    speakText();
}

/** UI FUNCTIONS */
function createBox(item) {
    const box = document.createElement('a');
    const { image, text } = item;

    box.setAttribute('href', '#/');
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active');
        }, 1200);
    })

    $main.appendChild(box);
}

function displayTextBox() {
    $textBoxContainer.classList.add('show');
    $textBox.classList.add('show');

    $voicesSelect.focus();

    $closeBtn.setAttribute('tabindex', 2);
    $voicesSelect.setAttribute('tabindex', 2);
    $textarea.setAttribute('tabindex', 2);
    $readBtn.setAttribute('tabindex', 2);
}

function hideTextBox() {
    $textBoxContainer.classList.remove('show');
    $textBox.classList.remove('show');

    $closeBtn.setAttribute('tabindex', -1);
    $voicesSelect.setAttribute('tabindex', -1);
    $textarea.setAttribute('tabindex', -1);
    $readBtn.setAttribute('tabindex', -1);
}

/** API FETCH */


/** APP INIT */
data.forEach(createBox);
getVoices();