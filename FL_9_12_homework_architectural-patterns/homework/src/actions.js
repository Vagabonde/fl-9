const REMOVE_USER = 'REMOVE_USER';
const SHOW_MORE = 'SHOW_MORE';
const SHOW_BY_DEFAULT = 'SHOW_BY_DEFAULT';
const SEARCH_BY_NAME = 'SEARCH_BY_NAME';

const showByDefault = (newParam = {
    type: SHOW_BY_DEFAULT,
}) => {
    return newParam;
};

const removeUser = (id) => {
    return {
        type: REMOVE_USER,
        payload: id,
    };
};

const showMore = () => {
    return {
        type: SHOW_MORE,
    };
};

const searchByName = (query) => {
    return {
        type: SEARCH_BY_NAME,
        payload: query,
    };
};

export {
    removeUser,
    showMore,
    showByDefault,
    searchByName,
    REMOVE_USER,
    SHOW_MORE,
    SHOW_BY_DEFAULT,
    SEARCH_BY_NAME,
};