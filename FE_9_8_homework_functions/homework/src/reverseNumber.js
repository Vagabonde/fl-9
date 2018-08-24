function reverseNumber(num) {
    if (num < 0) {
        num = parseInt(Math.abs(num).toString().split('').reverse().join(''));

        return -num;
    } else {
        num = parseInt(num.toString().split('').reverse().join(''));

        return num;
    }
}

