function askFoo() {
  return new Promise(function(resolve, reject) {
    resolve('foo');
  });
}

function run(generator) {
  let it = generator();

  function go(res) {
    if (res.done) {
      return result.value;
    }
    return res.value.then(function(value) {
      return go(it.next(value));
    }, function(error) {
      return go(it.throw(error));
    });

  }

  go(it.next());
}

run(function* () {
  try {
    let foo = yield askFoo();
    console.log(foo);
  } catch (error) {
    console.log(error);
  }
});
