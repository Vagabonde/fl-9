function* factorial(n) {
  let factorial = 1;
  for (let i = 1; i <= n; i++) {
    factorial *= i;

    yield factorial;
  }
}

for (var n of factorial(5)) {
  console.log(n);
}