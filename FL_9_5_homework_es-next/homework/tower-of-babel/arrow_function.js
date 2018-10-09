var inputs = process.argv.slice(2);
var result = inputs.map((el) => el[0])
.reduce((result, el)=> result + el);
console.log(result);
