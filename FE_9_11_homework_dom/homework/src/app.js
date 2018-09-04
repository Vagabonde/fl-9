const rootNode = document.getElementById(`root`);

const field = document.createElement(`div`);
field.classList.add(`field`);
rootNode.appendChild(field);
field.insertAdjacentHTML(`afterBegin`, `<h1>TODO cat list</h1>`);

const menu = document.createElement('div');
menu.classList.add('menu');
field.appendChild(menu);

const input = document.createElement(`input`);
menu.appendChild(input);
input.setAttribute(`type`, `text`);
input.setAttribute(`placeholder`, `Add new action`);

const btnAdd = document.createElement(`button`);
menu.appendChild(btnAdd);
btnAdd.setAttribute(`disabled`, ``);
btnAdd.classList.add(`btn-add`);
btnAdd.insertAdjacentHTML(`afterBegin`,
    `<i class="material-icons">add_box</i>`);

field.insertAdjacentHTML(`beforeEnd`, `<hr color="#000">`);

const list = document.createElement(`ul`);
field.appendChild(list);

field.insertAdjacentHTML(`beforeEnd`,
    `<i class="material-icons pets-icon">pets</i>`);

const notification = document.createElement(`p`);
notification.textContent = `Maximum items per list are created`;
notification.classList.add('notification');

const enterKeyCode = 13;

btnAdd.addEventListener(`click`, addNewTask);
input.addEventListener(`input`, toggleBtnAdd);
input.addEventListener(`keyup`, (e) => {
  if (e.keyCode === enterKeyCode && input.value !== ``) {
    addNewTask();
  }
});

//functions
function toggleBtnAdd() {
  if (input.value === `` && !btnAdd.hasAttribute(`disabled`)) {
    btnAdd.setAttribute(`disabled`, ``);
  } else if (input.value !== '' && btnAdd.hasAttribute(`disabled`)) {
    btnAdd.removeAttribute(`disabled`);
  }
}

function addNewTask() {
  const li = document.createElement(`li`);
  li.setAttribute(`draggable`, `true`);
  list.appendChild(li);
  const btnDelete = document.createElement(`button`);
  btnDelete.classList.add(`btn-delete`);
  btnDelete.insertAdjacentHTML(`afterBegin`,
      `<i class="material-icons">delete</i>`);
  const btnCheckbox = document.createElement(`button`);
  btnCheckbox.classList.add(`btn-checkbox`);
  btnCheckbox.insertAdjacentHTML(`afterBegin`,
      `<i class="material-icons">check_box_outline_blank</i>`);

  li.appendChild(btnCheckbox);
  li.insertAdjacentHTML(`beforeEnd`, `<p>${input.value}</p>`);
  li.appendChild(btnDelete);

  getCheckboxes();
  getDeleteBtns();
  getLis();

  input.value = ``;
  btnAdd.setAttribute(`disabled`, ``);
}

function getCheckboxes() {
  const checkboxes = document.querySelectorAll(`.btn-checkbox`);
  checkboxes.forEach(
      (checkbox) => checkbox.addEventListener(`click`, handleCheck));
}

function getDeleteBtns() {
  const deleteBtns = document.querySelectorAll(`.btn-delete`);
  deleteBtns.forEach((btn) => btn.addEventListener(`click`, deleteTask));
}

function handleCheck() {
  this.firstElementChild.textContent = `check_box`;
  this.classList.add(`checked`);
}

function deleteTask() {
  list.removeChild(this.parentElement);
  const lis = list.querySelectorAll(`li`);
  handleItemsMaxNum(lis);
}

function getLis() {
  const lis = list.querySelectorAll(`li`);
  handleItemsMaxNum(lis);
  lis.forEach((li) => li.addEventListener(`dragstart`, handleDragStart));
  lis.forEach((li) => li.addEventListener(`drop`, handleDrop));
  lis.forEach((li) => li.addEventListener(`dragover`, handleDragOver));
  lis.forEach((li) => li.addEventListener(`dragenter`, handleDragEnter));
  lis.forEach((li) => li.addEventListener(`dragleave`, handleDragLeave));
}

function handleItemsMaxNum(lis) {
  const maxLiNum = 10;

  if (lis.length === maxLiNum && !input.hasAttribute(`disabled`)) {
    btnAdd.setAttribute(`disabled`, ``);
    input.setAttribute(`disabled`, ``);
    field.insertBefore(notification,
        document.querySelector(`h1`).nextElementSibling);

  } else if (lis.length < maxLiNum && input.hasAttribute(`disabled`)) {
    btnAdd.removeAttribute(`disabled`);
    input.removeAttribute(`disabled`);
    field.removeChild(document.querySelector('.notification'));
  }

}

//drag&drop functions
function handleDragStart(e) {
  this.classList.add(`dragged`);
  e.dataTransfer.setData(`text`, this.className);
  e.dataTransfer.effectAllowed = `move`;
}

function handleDragEnter() {
  this.classList.add(`highlighted`);
}

function handleDragLeave() {
  this.classList.remove(`highlighted`);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
}

function handleDrop(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  if (this.classList.contains(`highlighted`)) {
    this.classList.remove(`highlighted`);
  }

  const className = e.dataTransfer.getData(`text`);
  const droppedLi = document.querySelector(`.${className}`);
  droppedLi.classList.remove(`dragged`);

  const coords = this.getBoundingClientRect();
  const halfHeight = 0.5;
  const elemCenterY = coords.top + halfHeight * this.offsetHeight;
  const clickY = e.clientY;
  if (clickY > elemCenterY) {
    list.insertBefore(droppedLi, this.nextSibling);
  } else {
    list.insertBefore(droppedLi, this);
  }
}

