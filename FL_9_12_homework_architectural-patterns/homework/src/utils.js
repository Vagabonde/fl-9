const root = document.getElementById('root');
root.insertAdjacentHTML('afterBegin',
    '<input type="text" placeholder="Enter user name" class="search-field">');

function renderList(list) {
    if (root.children.length > 1) {
        root.removeChild(root.querySelector('.list'));
    }
    root.insertAdjacentHTML('afterBegin',
        `<div class="list">
<div class="list-header">
        <div>Photo</div>
        <div>Name</div>
        <div>Address</div>
        <div class="email">Email</div>
        <div>Phone number</div>
        <div>Timezone</div>
        <div>Actions</div>
        </div>
        <button class="btn-load-more">Load more</button>
        </div>`);

    if (!list.length) {
        displayMessage('No users found');
    } else {
        list.forEach((el) => {
            createListElement(el);
        },
        );
    }
}

function createListElement(el) {
    const container = document.querySelector('.list');
    container.insertAdjacentHTML('beforeEnd',
        `<div class="list-element" data-id=${el.id}>
        <div><img src=${el.picture}></div>
        <div>${el.name}</div>
        <div>${el.location}</div>
        <div class="email">${el.email}</div>
        <div>${el.phone}</div>
        <div>${el.timezone}</div>
        <button class="btn-remove">Remove</button>
      </div>`);
}

function displayMessage(message) {
    const container = document.querySelector('.list');
    container.insertAdjacentHTML('beforeEnd',
        `<div class="message">${message}</div>`);
}

function getElId(target) {
    return target.parentElement.dataset.id;
}

export {renderList, getElId};