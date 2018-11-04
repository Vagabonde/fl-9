import './style.scss';
import {createStore} from 'redux';
import {reducer} from './reducer';
import {renderList, getElId} from './utils';
import {removeUser, showMore, showByDefault, searchByName} from './actions';

const store = createStore(reducer);
initStore();

function initStore() {
    store.subscribe(() => {
        renderList(store.getState().currentUsers);
        initHandlers();
    });
    store.dispatch(showByDefault());
}

function initHandlers() {
    const removeBtns = document.querySelectorAll('.btn-remove');
    const btnLoadMore = document.querySelector('.btn-load-more');
    const searchInput = document.querySelector('.search-field');
    removeBtns.forEach((btn) => btn.addEventListener('click', handleRemove));
    btnLoadMore.addEventListener('click', handleLoadMore);
    searchInput.addEventListener('change', handleSearchQuery);
}

function handleRemove(e) {
    const id = getElId(e.target);
    store.dispatch(removeUser(id));
    store.dispatch(showByDefault());
}

function handleLoadMore() {
    store.dispatch(showMore());
    store.dispatch(showByDefault());
}

function handleSearchQuery(e) {
    let query = e.target.value;
    console.log(query);
    store.dispatch(searchByName(query));
    store.dispatch(showByDefault());
}
