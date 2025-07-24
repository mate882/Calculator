function toggleScientific() {
    const panel = document.getElementById('scientific-panel');
    panel.classList.toggle('active');
}

function closeScientific() {
    const panel = document.getElementById('scientific-panel');
    panel.classList.remove('active');
}

function calculateFactorial() {
    const current = parseInt(currentInput);
    if (current < 0 || !Number.isInteger(current)) {
        alert('Factorial only works with non-negative integers');
        return;
    }
    if (current > 170) {
        alert('Number too large for factorial calculation');
        return;
    }
    
    let result = 1;
    for (let i = 2; i <= current; i++) {
        result *= i;
    }
    
    currentInput = result.toString();
    history = `${current}! =`;
    shouldResetDisplay = true;
    updateDisplay();
}let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;
let history = '';

const display = document.getElementById('result');
const historyDisplay = document.getElementById('history');

function updateDisplay() {
    let displayValue = currentInput;
    
    if (displayValue.length > 12) {
        if (displayValue.includes('e')) {
            displayValue = parseFloat(currentInput).toExponential(6);
        } else if (displayValue.includes('.')) {
            const parts = displayValue.split('.');
            if (parts[0].length > 8) {
                displayValue = parseFloat(currentInput).toExponential(6);
            } else {
                const availableDecimals = 11 - parts[0].length;
                displayValue = parseFloat(currentInput).toFixed(Math.max(0, availableDecimals));
            }
        } else {
            displayValue = parseFloat(currentInput).toExponential(6);
        }
    }
    
    display.textContent = displayValue;
    historyDisplay.textContent = history;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    history = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    
    operator = op;
    previousInput = currentInput;
    history = `${currentInput} ${op}`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculate() {
    if (!operator || shouldResetDisplay) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '−':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Cannot divide by zero');
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    history = `${previousInput} ${operator} ${currentInput} =`;
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function calculatePercent() {
    const current = parseFloat(currentInput);
    currentInput = (current / 100).toString();
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') 
            ? currentInput.slice(1) 
            : '-' + currentInput;
        updateDisplay();
    }
}

function calculateSin() {
    const current = parseFloat(currentInput);
    const result = Math.sin(current * Math.PI / 180);
    currentInput = result.toString();
    history = `sin(${current}°) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateCos() {
    const current = parseFloat(currentInput);
    const result = Math.cos(current * Math.PI / 180);
    currentInput = result.toString();
    history = `cos(${current}°) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateTan() {
    const current = parseFloat(currentInput);
    const result = Math.tan(current * Math.PI / 180);
    currentInput = result.toString();
    history = `tan(${current}°) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateLog() {
    const current = parseFloat(currentInput);
    if (current <= 0) {
        alert('Invalid input for logarithm');
        return;
    }
    const result = Math.log10(current);
    currentInput = result.toString();
    history = `log(${current}) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateLn() {
    const current = parseFloat(currentInput);
    if (current <= 0) {
        alert('Invalid input for natural logarithm');
        return;
    }
    const result = Math.log(current);
    currentInput = result.toString();
    history = `ln(${current}) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateSqrt() {
    const current = parseFloat(currentInput);
    if (current < 0) {
        alert('Invalid input for square root');
        return;
    }
    const result = Math.sqrt(current);
    currentInput = result.toString();
    history = `√(${current}) =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculatePower() {
    const current = parseFloat(currentInput);
    const result = Math.pow(current, 2);
    currentInput = result.toString();
    history = `(${current})² =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function calculateExp() {
    const current = parseFloat(currentInput);
    const result = Math.exp(current);
    currentInput = result.toString();
    history = `e^${current} =`;
    shouldResetDisplay = true;
    updateDisplay();
}

function insertPi() {
    currentInput = Math.PI.toString();
    history = 'π =';
    shouldResetDisplay = true;
    updateDisplay();
}

document.getElementById('btn-clear').onclick = clearAll;
document.getElementById('btn-backspace').onclick = backspace;
document.getElementById('btn-percent').onclick = calculatePercent;
document.getElementById('btn-negative').onclick = toggleSign;

document.getElementById('btn-divide').onclick = () => setOperator('÷');
document.getElementById('btn-multiply').onclick = () => setOperator('×');
document.getElementById('btn-subtract').onclick = () => setOperator('−');
document.getElementById('btn-add').onclick = () => setOperator('+');

document.getElementById('btn-0').onclick = () => appendNumber('0');
document.getElementById('btn-1').onclick = () => appendNumber('1');
document.getElementById('btn-2').onclick = () => appendNumber('2');
document.getElementById('btn-3').onclick = () => appendNumber('3');
document.getElementById('btn-4').onclick = () => appendNumber('4');
document.getElementById('btn-5').onclick = () => appendNumber('5');
document.getElementById('btn-6').onclick = () => appendNumber('6');
document.getElementById('btn-7').onclick = () => appendNumber('7');
document.getElementById('btn-8').onclick = () => appendNumber('8');
document.getElementById('btn-9').onclick = () => appendNumber('9');

document.getElementById('btn-decimal').onclick = appendDecimal;
document.getElementById('btn-equals').onclick = calculate;

document.getElementById('btn-sci').onclick = toggleScientific;
document.getElementById('btn-close-sci').onclick = closeScientific;
document.getElementById('btn-factorial').onclick = calculateFactorial;
document.getElementById('btn-sin').onclick = calculateSin;
document.getElementById('btn-cos').onclick = calculateCos;
document.getElementById('btn-tan').onclick = calculateTan;
document.getElementById('btn-log').onclick = calculateLog;
document.getElementById('btn-ln').onclick = calculateLn;
document.getElementById('btn-sqrt').onclick = calculateSqrt;
document.getElementById('btn-power').onclick = calculatePower;
document.getElementById('btn-exp').onclick = calculateExp;
document.getElementById('btn-pi').onclick = insertPi;

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+') {
        setOperator('+');
    } else if (key === '-') {
        setOperator('−');
    } else if (key === '*') {
        setOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        setOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearAll();
    } else if (key === 'Backspace') {
        backspace();
    }
});

updateDisplay();