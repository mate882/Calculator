let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultDisplayed = false;

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  resultDisplayed = false;
  result.textContent = '';
}

function backspace() {
  if (resultDisplayed) {
    clearAll();
    return;
  }
  if (operator === '') {
    firstNumber = firstNumber.slice(0, -1);
    result.textContent = firstNumber;
  } else {
    secondNumber = secondNumber.slice(0, -1);
    result.textContent = secondNumber;
  }
}

function calculate() {
  if (firstNumber === '' || secondNumber === '' || operator === '') return;

  let num1 = parseFloat(firstNumber);
  let num2 = parseFloat(secondNumber);
  let output;

  switch (operator) {
    case '+':
      output = num1 + num2;
      break;
    case '-':
      output = num1 - num2;
      break;
    case '*':
      output = num1 * num2;
      break;
    case '/':
      output = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    default:
      output = 'Error';
  }

  result.textContent = output;
  firstNumber = output.toString();
  secondNumber = '';
  operator = '';
  resultDisplayed = true;
}

function appendNumber(num) {
  if (resultDisplayed) {
    clearAll();
  }
  if (operator === '') {
    firstNumber += num;
    result.textContent = firstNumber;
  } else {
    secondNumber += num;
    result.textContent = secondNumber;
  }
}

function setOperator(op) {
  if (firstNumber === '') return;
  if (operator && secondNumber !== '') {
    calculate();
  }
  operator = op;
  resultDisplayed = false;
}

document.getElementById('btn1').onclick = clearAll;       
document.getElementById('btn2').onclick = backspace;      
document.getElementById('btn3').onclick = () => setOperator('/');  
document.getElementById('btn4').onclick = () => setOperator('*');  
document.getElementById('btn5').onclick = () => setOperator('+');  
document.getElementById('btn6').onclick = () => setOperator('-');  

document.getElementById('btn7').onclick = () => appendNumber('9');
document.getElementById('btn8').onclick = () => appendNumber('8');
document.getElementById('btn9').onclick = () => appendNumber('7');
document.getElementById('btn10').onclick = () => appendNumber('6');
document.getElementById('btn11').onclick = () => appendNumber('5');
document.getElementById('btn12').onclick = () => appendNumber('4');
document.getElementById('btn13').onclick = () => appendNumber('3');
document.getElementById('btn14').onclick = () => appendNumber('2');
document.getElementById('btn15').onclick = () => appendNumber('1');
document.getElementById('btn16').onclick = () => appendNumber('0');
document.getElementById('btn18').onclick = () => {
  if (operator === '') {
    if (!firstNumber.includes('.')) {
      firstNumber += '.';
      result.textContent = firstNumber;
    }
  } else {
    if (!secondNumber.includes('.')) {
      secondNumber += '.';
      result.textContent = secondNumber;
    }
  }
};

document.getElementById('btn17').onclick = calculate;     