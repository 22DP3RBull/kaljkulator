let history = JSON.parse(localStorage.getItem('history')) || [];

window.onload = function () {
    updateHistory();
};

function appendValue(value) {
    const resultField = document.getElementById('result');
    resultField.value += value;
}

function calculate() {
    const resultField = document.getElementById('result');
    const expression = resultField.value;

    try {
        const result = eval(expression);
        resultField.value = result;
        addToHistory(`${expression} = ${result}`);
    } catch (error) {
        resultField.value = 'Kļūda';
    }
}

function clearInput() {
    document.getElementById('result').value = '';
}

function addToHistory(entry) {
    history.push(entry);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = entry;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Dzēst';
        deleteButton.onclick = function () {
            deleteHistoryItem(index);
        };

        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

function clearHistory() {
    history = [];
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}
