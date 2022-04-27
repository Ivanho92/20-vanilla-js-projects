// DOM into variables
const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rate = document.getElementById('rate');

// App Init
calculate();

// Event Listeners
amountOne.addEventListener('input', calculate);
amountTwo.addEventListener('input', calculate);
currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})

// Fetch API
async function getExchangeRates(currency) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/979bb0050681f4850ec14b36/latest/${currency}`);
    if (!response.ok) throw new Error(reponse.status);
    const data = await response.json();
    return data; 
}

// Functions
function calculate() {
    getExchangeRates(currencyOne.value)
        .then(data => {
            const exchangeRate = data.conversion_rates[currencyTwo.value]

            rate.textContent = `1 ${currencyOne.value} = ${exchangeRate} ${currencyTwo.value}`;

            amountTwo.value = (amountOne.value * exchangeRate).toFixed(2);
        })
        .catch(error => console.error(error));
}