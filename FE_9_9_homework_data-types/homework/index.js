function findType(parameter) {
    return typeof parameter;
}

function forEach(array, func) {
    for (let i = 0; i < array.length; i++) {
        func(array[i]);
    }
}

function map(array, func) {
    let transformedArray = [];
    forEach(array, item => transformedArray.push(func(item)));

    return transformedArray;
}

function filter(array, func) {
    let filteredArray = [];

    for (let i = 0; i < array.length; i++) {
        if (func(array[i])) {
            filteredArray.push(array[i]);
        }
    }
    return filteredArray;
}

function getAdultAppleLovers(data) {
    let adultAppleLovers = filter(data, item => item.age > 18 && item.favoriteFruit === 'apple');

    return map(adultAppleLovers, item => item.name);
}

function keys(obj) {
    let keys = [];

    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        keys.push(key);
    }
    return keys;
}

function values(obj) {
    let values = [];

    for (let key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        values.push(obj[key]);
    }
    return values;
}

function showFormattedDate(date) {
    const year = date.getFullYear();

    const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];
    const monthIndex = date.getMonth();
    const month = months[monthIndex];

    const day = date.getDate();

    return `It is ${day} of ${month}, ${year}`;
}







