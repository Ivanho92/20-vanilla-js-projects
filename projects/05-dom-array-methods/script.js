// CONSTANTS
const API_ENDPOINT = 'https://randomuser.me/api/';

// DOM variables
const records = document.querySelector('.records');
const addUserBtn = document.querySelector('#add-user');
const doubleMoneyBtn = document.querySelector('#double-money');
const showMillionairesBtn = document.querySelector('#show-millionaires');
const sortByRichestBtn = document.querySelector('#sort-richest');
const showWealthBtn = document.querySelector('#sum-wealth');

// App Init
let users = [];
for (let i = 0; i < 3; i++) addUser();

// Event Listeners
addUserBtn.addEventListener('click', addUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', filterMillionaires);
sortByRichestBtn.addEventListener('click', sortByRichest);
showWealthBtn.addEventListener('click', showHideHealth);

// API Fetch
async function fetchData(endpoint) {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(response.status);
    const data = await response.json();
    return data;
}

// UI Functions
function drawUsers() {
    const totalRow = document.querySelector('.records .total');

    records.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `
            <p class="col1">${user.lastName} ${user.firstName}</p>
            <p class="col2">${formatMoney(user.wealth)}</p>
        `;
        records.appendChild(row);
    })
    
    if (totalRow) updateTotalRow(totalRow);
}

function drawTotal(total) {
        // const totalRow = document.querySelector('.total');
        // if (totalRow) totalRow.remove();
        const row = document.createElement('div');
        row.className = 'row total';
        row.innerHTML = `
            <p class="col1">Total Wealth:</p>
            <p class="col2">${formatMoney(total)}</p>
        `;
        records.appendChild(row);
}

// Logic Functions
function addUser() {
    fetchData(API_ENDPOINT)
    .then(data => {
        const user = data.results[0];
        const firstName = user.name.first;
        const lastName = user.name.last;
        const wealth = Math.floor(Math.random() * 1000000);
        const newUser = {
            firstName: firstName,
            lastName: lastName,
            wealth: wealth,
        };
        users.push(newUser);
        drawUsers();
    })
    .catch(error => console.error(error));
}

function doubleMoney() {
    users.map(user => user.wealth = user.wealth * 2);
    drawUsers();
}

function filterMillionaires() {
    users = users.filter(user => user.wealth >= 1000000);
    drawUsers();
}

function sortByRichest() {
    users = users.sort((userA, userB) => userB.wealth - userA.wealth);
    drawUsers();
}

function showHideHealth() {
    const totalRow = document.querySelector('.records .total');
    if (!totalRow) {
        showWealthBtn.textContent = 'Hide Total Wealth 🧮';
        sumWealth();
    } else {
        totalRow.remove();
        showWealthBtn.textContent = 'Show Total Wealth 🧮';
    };
}

function sumWealth() {
    let total = 0;
    total += users.reduce((sum, currentUser) => {
        return sum + currentUser.wealth
    }, 0);
    drawTotal(total);
}

function updateTotalRow(totalRow) {
    totalRow.remove();
    sumWealth();
}

// Helper Functions
function formatMoney(number) {
    return new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(number)
}