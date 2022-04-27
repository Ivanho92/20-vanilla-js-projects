// import data from './_data.js';

// Variables
const $cardsContainer = document.querySelector('#cards-container');
const $modalContainer = document.querySelector('#add-container');

const $showModalBtn = document.querySelector('#show');
const $clearBtn = document.querySelector('#clear');
const $navigation = document.querySelector('#navigation');

const $newCardQuestion = document.querySelector('#question');
const $newCardAnswer = document.querySelector('#answer');
const $form = document.querySelector('#add-card');

let cards = [];

let currentIndex = 0;
let previous, next;

// Local Storage
const getFromStorage = el => {
    const data = localStorage.getItem(el) !== null ? JSON.parse(localStorage.getItem(el)) : [];
    return data;
}

const addToStorage = (el) => {
    return localStorage.setItem(el, JSON.stringify(cards));
}

// Cards CRUD
const getCards = () => {
    const cards = getFromStorage('cards');
    return cards;
};

const clearCards = () => {
    cards = [];
    currentIndex = 0;
};

const addCard = (e) => {
    e.preventDefault();

    if ($newCardQuestion.value === '' || $newCardAnswer.value === '')
        return false;

    const card = {
        question: $newCardQuestion.value,
        answer: $newCardAnswer.value,
    };

    cards.push(card);
    addToStorage('cards');
};

// UI Functions
const UIdrawCards = () => {
    if (cards.length === 0)
        return ($cardsContainer.innerHTML = `
        <div class="no-cards">
            No cards found...
        </div>    
    `);

    let html = '';
    cards.forEach((card, index) => {
        html += `
            <div class="card" data-flipped="false" ${
                index === currentIndex ? 'data-state="active"' : ''
            } ${
            index === 0 || index === currentIndex
                ? ''
                : index < currentIndex
                ? 'data-position="left"'
                : 'data-position="right"'
        }>
                <div class="inner-card">
                    <div class="inner-card-front">
                        <p>${card.question}</p>
                    </div>
                    <div class="inner-card-back">
                        <p>${card.answer}</p>
                    </div>
                </div>
            </div>
        `;
    });
    $cardsContainer.innerHTML = html;
};

const UIshowModal = () => $modalContainer.setAttribute('data-state', 'show');
const UIhideModal = (e) => {
    if (
        e.target.id === 'add-container' ||
        e.target.id === 'hide' ||
        e.target.classList.contains('fa-times')
    ) {
        $modalContainer.removeAttribute('data-state');
    }
};

const UIupdateNavigation = () => {
    if (cards.length === 0) return ($navigation.innerHTML = '');
    $navigation.innerHTML = `
        <button class="nav-button" id="prev">
            <i class="fas fa-arrow-left"></i>
        </button>
        <p class="navigation-current" id="current">${currentIndex + 1}/${
        cards.length
    }</p>
        <button class="nav-button" id="next">
            <i class="fas fa-arrow-right"></i>
        </button>
    `;

    previous = document.querySelector('#prev');
    next = document.querySelector('#next');

    previous.addEventListener('click', () => {
        UIgoToPrevious();
        UIupdateNavigation();
    });
    next.addEventListener('click', () => {
        UIgoToNext();
        UIupdateNavigation();
    });
};

const UIcleanForm = () => {
    $newCardQuestion.value = '';
    $newCardAnswer.value = '';
};

const UIflipCard = (e) => {
    const currentCard =
        e.target.tagName.toLowerCase() === 'p'
            ? e.target.parentNode.parentNode.parentNode
            : e.target.parentNode.parentNode;
    if (currentCard.getAttribute('data-state') === 'active') {
        const flippedState = currentCard.getAttribute('data-flipped');
        const nextState = flippedState === 'true' ? false : true;
        currentCard.setAttribute('data-flipped', nextState);
    }
};

const UIgoToPrevious = () => {
    if (currentIndex === 0) return false;
    currentIndex--;

    document
        .querySelector('[data-state="active"]')
        .removeAttribute('data-state');

    const $cards = Array.from(document.querySelectorAll('.card'));

    $cards.forEach(($card) => $card.setAttribute('data-flipped', 'false'));

    const $previousCard = $cards.find((card, index) => index === currentIndex);
    const $nextCard = $cards.find((card, index) => index === currentIndex + 1);

    $nextCard.setAttribute('data-position', 'right');
    $previousCard.removeAttribute('data-position');
    $previousCard.setAttribute('data-state', 'active');
};

const UIgoToNext = () => {
    if (currentIndex === cards.length - 1) return false;
    currentIndex++;

    document
        .querySelector('[data-state="active"]')
        .removeAttribute('data-state');

    const $cards = Array.from(document.querySelectorAll('.card'));

    $cards.forEach(($card) => $card.setAttribute('data-flipped', 'false'));

    const $previousCard = $cards.find(
        (card, index) => index === currentIndex - 1
    );
    const $nextCard = $cards.find((card, index) => index === currentIndex);

    $previousCard.setAttribute('data-position', 'left');
    $nextCard.removeAttribute('data-position');
    $nextCard.setAttribute('data-state', 'active');
};

// Event listeners
$showModalBtn.addEventListener('click', UIshowModal);
$modalContainer.addEventListener('mousedown', UIhideModal);

$clearBtn.addEventListener('click', () => {
    clearCards();
    addToStorage('cards');
    UIdrawCards();
    UIupdateNavigation();
});

$form.addEventListener('submit', (e) => {
    addCard(e);
    UIdrawCards();
    UIupdateNavigation();

    UIcleanForm();
    $modalContainer.removeAttribute('data-state'); // Hide modal
});

$cardsContainer.addEventListener('click', UIflipCard);

// Init
(() => {
    cards = getCards();
    UIdrawCards();
    UIupdateNavigation();
})();
