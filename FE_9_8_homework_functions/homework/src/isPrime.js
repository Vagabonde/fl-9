const firstFactor = 2;

function isPrime(num) {
    for (let i = firstFactor; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {

            return false;
        }
    }

    return true;
}
