let inputLengthA = parseFloat(prompt('Please, enter the value of first side of triangle', '0'));
let inputLengthB = parseFloat(prompt('Please, enter the value of second side of triangle', '0'));
let inputAngle = parseFloat(prompt('Please, enter the value of angle between two sides', '0'));

const maxAngle = 180;
const PiRad = 180;
const minValue = 0;
const minValueForDecimal = minValue.toFixed(2);


function showMessage(message) {
    console.log(message);
}

function formatNumber(num) {
    return Number.isInteger(num) ? num : num.toFixed(2);
}

function convertToRad(value) {
    return value * Math.PI / PiRad;
}

class Triangle {

    constructor(lengthA, lengthB, angle) {
        this.aSideLength = lengthA;
        this.bSideLength = lengthB;
        this.angleBetweenSides = angle;
    }

    calcCSideLength() {
        return Math.sqrt(Math.pow(this.aSideLength, 2) + Math.pow(this.bSideLength, 2)
            - 2 * this.aSideLength * this.bSideLength * Math.cos(convertToRad(this.angleBetweenSides)));
    }

    calcPerimeter() {
        return this.aSideLength + this.bSideLength + this.cSideLength;
    }

    calcSquare() {
        return this.aSideLength * this.bSideLength * Math.sin(convertToRad(this.angleBetweenSides) / 2);
    }

    get cSideLength() {
        return this.calcCSideLength();
    }

    get perimeter() {
        return this.calcPerimeter();
    }

    get square() {
        return this.calcSquare();
    }

    get isValid() {
        return !(this.aSideLength <= minValue ||
            this.bSideLength <= minValue ||
            this.angleBetweenSides <= 0 ||
            this.angleBetweenSides >= maxAngle || formatNumber(this.cSideLength) === minValueForDecimal ||
            formatNumber(this.square) === minValueForDecimal || formatNumber(this.perimeter) === minValueForDecimal);
    }
}

if (isNaN(inputLengthA) || isNaN(inputLengthB) || isNaN(inputAngle)) {
    showMessage('Invalid data');
} else {
    let userTriangle = new Triangle(inputLengthA, inputLengthB, inputAngle);

    if (!userTriangle.isValid) {
        showMessage('Invalid data');
    } else {
        showMessage(`c length: ${formatNumber(userTriangle.cSideLength)}
Triangle square: ${formatNumber(userTriangle.square)}
Triangle perimeter: ${formatNumber(userTriangle.perimeter)}`);
    }
}





