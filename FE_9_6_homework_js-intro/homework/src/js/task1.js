let inputPrice = parseFloat(prompt('Please, enter the price', '0'));
let inputDiscount = parseFloat(prompt('Please, enter the discount', '0'));

displayWithDiscount(inputPrice, inputDiscount);

function displayWithDiscount(price, discount) {

    if (isValidPrice(price) && isValidDiscount(discount)) {

        let countedData = countWithDiscount(price, discount);

        showMessage(`Price without discount: ${formatNumber(price)}
Discount: ${formatNumber(discount)}%
Price with discount: ${formatNumber(countedData.priceWithDiscount)}
Saved: ${formatNumber(countedData.savedMoney)}`);
    } else {
        showMessage('Invalid data');
    }
}

function countWithDiscount(price, discount) {

    let result = {};

    let discountDecimal = discount / 100;
    result.priceWithDiscount = (1 - discountDecimal) * price;
    result.savedMoney = price - result.priceWithDiscount;
    return result;
}

function isValidPrice(num) {
    return !(isNaN(num) || num < 0)
}

function isValidDiscount(num) {
    return !(isNaN(num) || num < 0 || num > 100)
}

function showMessage(message) {
    console.log(message);
}

function formatNumber(num) {
    if (Number.isInteger(num)) {
        return num;
    } else if (num.toFixed(2) === '0.00') {
        return 0;
    } else if (num.toFixed(2) === `${num.toFixed()}.00`) {
        return num.toFixed();
    }
    return num.toFixed(2);
}


