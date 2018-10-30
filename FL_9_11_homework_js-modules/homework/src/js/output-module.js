import '../styles/styles.css';
import * as calculating from './calculating-module';
import render from './interface-module.js';

render();

const input = document.querySelector('.operation-input');
const btns = document.querySelectorAll('.operation-btn');
btns.forEach((btn) => {
  btn.addEventListener('click', handleClick);
});

function handleClick() {
  if (this.textContent === 'c') {
    input.value = '';
  } else if (this.textContent === '=') {
    const result = parseInput(input.value);
    if (result) {
      displayResult(result);
    }
  } else {
    input.value = input.value + this.textContent;
  }
}

function parseInput(value) {
  let numbers = value.match(/\d+/g);
  let operator = value.match(/\D/g);
  if (checkInput(numbers, operator)) {
    return calculate(parseInt(numbers[0]), parseInt(numbers[1]),
        operator[0]);
  } else {
    console.warn('Incorrect data');
  }
}

function checkInput(numbers, operator) {
  return numbers.length === 2 && operator.length === 1;
}

function calculate(a, b, operator) {
  let result;
  switch (operator) {
    case '+':
      result = calculating.add(a, b);
      break;
    case '-':
      result = calculating.subtract(a, b);
      break;
    case '*':
      result = calculating.multiply(a, b);
      break;
    case '/':
      result = calculating.divide(a, b);
      break;
    default:
      console.warn('Unexpected operator');
  }

  return result;
}

function displayResult(result) {
  input.value = result;
}