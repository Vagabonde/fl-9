function getMin() {
    let minNumber = arguments[0];

    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] < minNumber) {
            minNumber = arguments[i];
        }
    }

    return minNumber;
}