const max = process.argv[2];

let FizzBuzz = function*() {
  const divBy3 = `Fizz`;
  const divBy5 = `Buzz`;
  const divBy3and5 = divBy3 + divBy5;
  let i = 1;
  let value;

  while (i <= max) {

    if (i % 15 === 0 ) {
      value = divBy3and5;
    } else if (i % 5 === 0) {
      value = divBy5;
    } else if (i % 3 === 0 ) {
      value = divBy3;
    } else {
      value = i;
    }
    i++;
    yield value;
  }
}();

for (var n of FizzBuzz) {
  console.log(n);
}