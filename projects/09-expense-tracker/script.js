/** DEPENDENCIES */


/** DOM VARIABLES */
$transactions = document.querySelector('#transactions');
$history = document.querySelector('#history');
$balance = document.querySelector('#balance');
$income = document.querySelector('#income');
$expense = document.querySelector('#expense');
$delete = document.querySelector('#delete');
$form = document.querySelector('#new-transaction');
$form_description = document.querySelector('#description');
$form_amount = document.querySelector('#amount');


/** EVENTS */
$transactions.addEventListener('click', e => {
    e.preventDefault();
    const id =  e.target.parentElement.getAttribute('id');
    selectedID = id;
});

$delete.addEventListener('click', e => {
    e.preventDefault();
    deleteTransaction(selectedID);
    MicroModal.close('modal-1');
});

$form.addEventListener('submit', e => {
    e.preventDefault();
    addTransaction($form_description.value, parseInt($form_amount.value));
    $form_description.value = '';
    $form_amount.value = '';
})

/** APP */
let transactions,
    selectedID,
    income,
    expense,
    totalIncome,
    totalExpense,
    balance;

function calculateIncome () {
    income = transactions.filter(transaction => transaction.amount >= 0);
    totalIncome = income.reduce((previousTransaction, transaction) => {
        return transaction.amount + previousTransaction;
    }, 0);
}

function calculateExpense () {
    expense = transactions.filter(transaction => transaction.amount < 0);
    totalExpense = expense.reduce((previousTransaction, transaction) => {
        return  transaction.amount + previousTransaction;
    }, 0);
}

function calculateBalance () {
    balance = totalIncome + totalExpense;
}

function calculateData() {
    calculateIncome();
    calculateExpense();
    calculateBalance();
}

function addTransaction(description, amount) {
    transactions.push({
        id: generateID() || 1,
        description,
        amount
    });
    calculateData();
    updateUI();
    ls_updateTransactions();
}

function deleteTransaction() {
    transactions = transactions.filter(transaction => transaction.id != selectedID);
    calculateData();
    updateUI();
    ls_updateTransactions();
}

function generateID() {
    ids = transactions.map(transaction => transaction.id);
    maxId = Math.max(...ids);
    return maxId < 0 ? 1 : maxId + 1;
}

/** UI FUNCTIONS */
function printTransactions() {
    $transactions.innerHTML = '';

    transactions.forEach(transaction => {
        const $transaction = document.createElement('a');
        $transaction.setAttribute('href', '#');
        $transaction.setAttribute('data-micromodal-trigger', 'modal-1');
        $transaction.setAttribute('id', transaction.id);
        $transaction.innerHTML = `
            <div class="transaction ${ transaction.amount <= 0 ? 'tr-expense' : 'tr-income' }">
                <p>${ transaction.description }</p>
                <p>${ transaction.amount }</p>
            </div>
        `;

        $transactions.appendChild($transaction);
    })

    MicroModal.init();
}

function printIncome() {
    $income.textContent = totalIncome + '€';
}
function printExpense() {
    $expense.textContent = totalExpense + '€';
}
function printBalance() {
    $balance.textContent = balance + '€';
}

function updateUI() {
    $history.style.display = balance !== 0 ? 'block' : 'none';
    $form_description.blur();
    $form_amount.blur();
    printTransactions();
    printIncome();
    printExpense();
    printBalance();
}

/** API FETCH */


/** LOCAL STORAGE */
function ls_getTransactions() {
    const storageTransactions = localStorage.getItem('transactions');
    if (!storageTransactions) return transactions = [];
    transactions = JSON.parse(storageTransactions);
}

function ls_updateTransactions() {
    jsonTransactions = JSON.stringify(transactions);
    localStorage.setItem('transactions', jsonTransactions);
}

/** APP INIT */
MicroModal.init();
ls_getTransactions();
calculateData();
updateUI();