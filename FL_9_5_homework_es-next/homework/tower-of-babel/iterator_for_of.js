const max = process.argv[2];
let FizzBuzz = {
  [Symbol.iterator]() {
    const divBy3 = `Fizz`;
    const divBy5 = `Buzz`;
    const divBy3and5 = divBy3 + divBy5;
    let value;
    let i = 1;
   
    return {
      next() {
        if (i <= max) {

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
          return {done: false, value: value}
        } else {
          return {done:true};
        }
      },
    };
  },
};

for (var n of FizzBuzz) {
  console.log(n);
}