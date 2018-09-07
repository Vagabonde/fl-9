const rootNode = document.getElementById('root');

generateHomePage();
window.addEventListener(`hashchange`, route);

//functions
function route() {
  let action = location.hash;

  if (action === `#add`) {
    clearDom();
    generateTemplate(`Add task`, storeTask);
  } else if (/#modify/.test(action)) {
    clearDom();
    generateTemplate(`Modify`, saveChanges);
    fillInput();
  } else {
    clearDom();
    generateHomePage();
  }
}

function clearDom() {
  rootNode.removeChild(rootNode.firstChild);
}

function generateTemplate(header, funcSave) {
  const field = document.createElement(`div`);
  field.classList.add(`field`);
  field.insertAdjacentHTML(`afterBegin`, `<h1>${header}</h1>`);
  rootNode.appendChild(field);

  const input = document.createElement(`input`);
  field.appendChild(input);
  input.setAttribute(`type`, `text`);

  const btnSave = document.createElement(`button`);
  field.appendChild(btnSave);
  btnSave.classList.add(`btn-save`);
  btnSave.textContent = `Save changes`;

  const btnCancel = document.createElement(`button`);
  field.appendChild(btnCancel);
  btnCancel.classList.add(`btn-cancel`);
  btnCancel.textContent = `Cancel`;

  btnSave.addEventListener(`click`, funcSave);
  btnCancel.addEventListener(`click`, goToHomePage);
}

function goToHomePage() {
  location.hash = ``;
}

function getItemById(id) {
  return JSON.parse(localStorage.getItem(id));
}

//homepage functions
function generateHomePage() {
  const field = document.createElement(`div`);
  field.classList.add(`field`);
  field.insertAdjacentHTML(`afterBegin`, `<h1>Simple TODO Application</h1>`);
  rootNode.appendChild(field);

  const btnAdd = document.createElement(`button`);
  field.appendChild(btnAdd);
  btnAdd.classList.add(`btn-add`);
  btnAdd.insertAdjacentHTML(`afterBegin`, `<a href="#add">Add new task</a>`);

  const list = document.createElement(`ul`);
  field.appendChild(list);
  getTasks();
}

function getTasks() {
  let tasks = [];

  for (let i = 0; i <= localStorage.length; i++) {
    if (!localStorage.length) {
      return;
    }
    const key = localStorage.key(i);
    if (key === `counter`) {
      break;
    }
    const task = JSON.parse(localStorage.getItem(key));
    tasks.push(task);
  }

  if (tasks.length) {
    const trueKey = 1;
    const falseKey = -1;
    const egualKey = 0;
    tasks = tasks.sort(function(a, b) {
      if (a.isDone === b.isDone) {
        return egualKey;
      } else if (a.isDone) {
        return trueKey;
      } else {
        return falseKey;
      }
    });
    for (let i = 0; i < tasks.length; i++) {
      renderTask(tasks[i]);
    }
  }
}

function renderTask(task) {

  const li = document.createElement(`li`);
  const btnDelete = document.createElement(`button`);
  btnDelete.classList.add(`btn-delete`);
  const btnCheckbox = document.createElement(`button`);
  btnCheckbox.classList.add(`btn-checkbox`);
  if (task.isDone === `true`) {
    btnCheckbox.classList.add(`checked`);
  }
  const a = document.createElement(`a`);
  a.insertAdjacentText(`afterBegin`, `${task.description}`);
  a.setAttribute(`href`, `#modify/:${task.id}`);

  btnDelete.addEventListener(`click`, () => localStorage.removeItem(task.id));
  btnDelete.addEventListener(`click`,
      (event) => event.target.parentNode.remove());
  btnCheckbox.addEventListener(`click`, (e) => {
    task.isDone = `true`;
    localStorage.setItem(task.id, JSON.stringify(task));
    if (!e.target.classList.contains(`checked`)) {
      document.querySelector(`ul`).appendChild(e.target.parentNode);
    }
    btnCheckbox.classList.add(`checked`);

  });

  li.appendChild(btnCheckbox);
  li.appendChild(a);
  li.appendChild(btnDelete);
  document.querySelector(`ul`).appendChild(li);
}

// add page functions
function storeTask() {
  let inputValue = document.querySelector(`input`).value;

  if (!inputValue) {
    return;
  }

  if (!getItemById(`counter`)) {
    localStorage.setItem(`counter`, `1`);
  }

  let task = {
    isDone: false,
    id: getItemById(`counter`),
    description: inputValue
  };

  localStorage.setItem(task.id, JSON.stringify(task));
  let counter = getItemById(`counter`) + 1;
  localStorage.setItem(`counter`, counter);

  location.hash = ``;
}

//modify page functions
function saveChanges() {
  let inputValue = document.querySelector(`input`).value;
  if (!inputValue) {
    return;
  }
  const id = getId();
  let task = getItemById(id);
  task.description = inputValue;

  localStorage.setItem(id, JSON.stringify(task));
  location.hash = ``;
}

function fillInput() {
  const id = getId();
  let task = getItemById(id);
  document.querySelector(`input`).value = task.description;
}

function getId() {
  return location.hash.split(/\/:/)[1];
}








