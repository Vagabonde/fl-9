/**
 * @return {string}
 */
function findType(parameter) {
  return typeof parameter;
}

function forEach(array, func) {
  for (let i = 0; i < array.length; i++) {
    func(array[i]);
  }
}

/**
 * @return {Array}
 */
function map(array, func) {
  let transformedArray = [];
  forEach(array, item => transformedArray.push(func(item)));

  return transformedArray;
}

/**
 * @return {Array}
 */
function filter(array, func) {
  let filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
}

/**
 * @return {Array}
 */
function getAdultAppleLovers(data) {
  let adultAppleLovers = filter(data,
      item => item.age > 18 && item.favoriteFruit === `apple`);

  return map(adultAppleLovers, item => item.name);
}

/**
 * @return {Array}
 */
function keys(obj) {
  let keys = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

/**
 * @return {Array}
 */
function values(obj) {
  let values = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }
  return values;
}

/**
 * @return {string}
 */
function showFormattedDate(date) {
  const year = date.getFullYear();
  const months = [
    `Jan`,
    `Feb`,
    `Mar`,
    `Apr`,
    `May`,
    `Jun`,
    `Jul`,
    `Aug`,
    `Sep`,
    `Oct`,
    `Nov`,
    `Dec`];
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const day = date.getDate();

  return `It is ${day} of ${month}, ${year}`;
}







