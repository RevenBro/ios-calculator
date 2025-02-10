const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let operator = null;
let previousInput = '';
let shouldResetDisplay = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    
    if (!isNaN(value) || value === '.') {
      if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
      }
      currentInput += value;
      display.textContent = currentInput;
    } else if (value === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = null;
      display.textContent = '0';
    } else if (value === '+/-') {
      currentInput = (parseFloat(currentInput) * -1).toString();
      display.textContent = currentInput;
    } else if (value === '%') {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.textContent = currentInput;
    } else if (['+', '−', '×', '÷'].includes(value)) {
      if (currentInput === '') return;
      if (previousInput !== '') {
        calculate();
      }
      operator = value;
      previousInput = currentInput;
      display.textContent = `${currentInput} ${operator}`;
      shouldResetDisplay = true;
    } else if (value === '=') {
      if (currentInput === '' || previousInput === '') return;
      calculate();
      operator = null;
    }
  });
});

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;
  
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
    result = prev / current;
    break;
    default:
    return;
  }
  
  currentInput = result.toString();
  previousInput = '';
  display.textContent = currentInput;
  shouldResetDisplay = true;
}