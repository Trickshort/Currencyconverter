const apiKey = 'e21e85ef2c9e4f30d9c4dd30'; 
const apiUrl = ` https://v6.exchangerate-api.com/v6/e21e85ef2c9e4f30d9c4dd30/latest/USD`;

const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultField = document.getElementById('result');
const convertBtn = document.getElementById('convert-btn');
const swapBtn = document.getElementById('swap-btn');

// Fetch currency data and populate the dropdowns
function populateCurrencyDropdowns(data) {
    const currencies = Object.keys(data.conversion_rates);
    
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = currency;
        option1.textContent = option2.textContent = currency;
        fromCurrency.appendChild(option1);
        toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
}

// Fetch exchange rates from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        populateCurrencyDropdowns(data);
    })
    .catch(error => console.error('Error fetching exchange rates:', error));

// Conversion logic
convertBtn.addEventListener('click', () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (amount === "" || amount <= 0) {
        resultField.textContent = "Please enter a valid amount.";
        return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.conversion_rate;
            const convertedAmount = amount * rate;
            resultField.textContent = 
                `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        })
        .catch(error => {
            console.error('Error converting currency:', error);
            resultField.textContent = "Error retrieving data. Please try again.";
        });
});

// Swap currencies
swapBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
});
