// I. const (6)

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapEl = document.getElementById('swap');

// II. function caclculate () {...}

function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    fetch('https://open.exchangerate-api.com/v6/latest')
        .then(response => response.json())
        .then(data => {       
        const rate = data.rates[currency_two] / data.rates[currency_one];
        rateEl.innerText = `1 ${currency_one} = ${rate.toFixed(2)} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * (rate)).toFixed(2); 
        });
};

// III. Event Listener (5)

currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swapEl.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;

    calculate();
});

calculate();