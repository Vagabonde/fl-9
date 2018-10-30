const container = document.getElementById('container');
const btnSigns = ['+', '-','*', '/', 'c', '='];
const btnNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function render() {
  container.insertAdjacentHTML('beforeEnd', '<div class="btn-container"></div>');
  btnSigns.forEach((item) => document.querySelector('.btn-container').
      insertAdjacentHTML('beforeEnd',
          `<button class="operation-btn sign-btn">${item}</button>`));
  btnNums.forEach((item) => document.querySelector('.btn-container').
      insertAdjacentHTML('beforeEnd',
          `<button class="operation-btn numeric-btn">${item}</button>`));
  container.insertAdjacentHTML('afterBegin',
      '<input class="operation-input" type="text" disabled>');
}

