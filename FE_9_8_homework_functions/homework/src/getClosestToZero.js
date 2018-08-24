function getClosestToZero() {
    let numbers = [...arguments];
    let absNumbers = numbers.map((number) => Math.abs(number));
    let absClosestToZero = getMin(...absNumbers);
    let closestToZeroIndex = absNumbers.indexOf(absClosestToZero);

    return numbers[closestToZeroIndex];
}

