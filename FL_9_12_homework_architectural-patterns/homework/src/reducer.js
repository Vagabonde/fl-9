import {
    REMOVE_USER,
    SHOW_MORE,
    SHOW_BY_DEFAULT,
    SEARCH_BY_NAME,
} from './actions';
import data from './data';

const defaultState = {
    data,
    filterByName: '',
    usersByDefault: 5,
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
    case REMOVE_USER:
        return removeUser(state, action.payload);
    case SHOW_MORE:
        return showMore(state, action.payload);
    case SHOW_BY_DEFAULT:
        return showByDefault(state, action.payload);
    case SEARCH_BY_NAME:
        return searchByName(state, action.payload);
    default:
        return state;
    }
};

function removeUser(state, id) {
    let filteredUsers = state.data.filter((item, index) => {
        if (item.id !== id) {
            return item;
        } else {
            state.data.splice(index, 1);
        }
    });
    return {
        ...state,
        data: filteredUsers,
    };
}

function showMore(state) {
    return {
        ...state,
        usersByDefault: state.usersByDefault + 5,
    };
}

function showByDefault(state) {
    let currentUsers = state.data.slice(0, state.usersByDefault);
    if (state.filterByName) {
        currentUsers = state.searchResult.slice(0, state.usersByDefault);
    }
    return {
        ...state,
        currentUsers,
    };
}

function searchByName(state, query) {
    let searchResult = state.data.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    return {
        ...state,
        searchResult,
        filterByName: query,
    };
}

export {reducer};