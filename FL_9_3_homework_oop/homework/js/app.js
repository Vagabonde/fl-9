function ShoppingCart(name, owner, maxCount) {
  this.name = name;
  this.owner = owner;
  this.maxCount = maxCount;
  let products = [];
  let logs = [];
  const self = this;

  this.addNewProduct = function(product) {
    if (product instanceof Product) {
      if (products.length === maxCount) {
        const productWithMinPrice = products.slice().sort((item1, item2) => item1.price - item2.price)[0];
        const index = products.indexOf(productWithMinPrice);
        this.removeProduct(index);
      }
      products.push(product);
      product.add(this);
      product.date = new Date();
      addToHistoryLog(`Product addition`, products.length - 1,
          product.date);
    } else {
      console.log('Invalid product');
    }
    return this;
  };

  this.removeProduct = function(index) {
    addToHistoryLog(`Product removal`, index);
    products[index].removeProduct(this);
    products.splice(index, 1);
    return this;
  };

  this.getAveragePrice = function() {
    if (products.length > 0) {
      let priceSum = countPriceSum();
      return priceSum / products.length;
    }
  };

  this.getProducts = () => products;

  this.getFormattedListOfProducts = function() {
    return products.map(
        (product) => {
          return `${product.name} - is on ${this.name} from ${product.date.toLocaleString()}. 
Detailed product description: ${product.description}`;
        });
  };

  this.getTotalPrice = () => countPriceSum();

  this.getHistory = () => logs;

  function addToHistoryLog(operationType, index, date = new Date()) {
    logs.push({
      operationType: operationType,
      cart: self.name,
      product: products[index].name,
      price: products[index].price,
      operationTime: date.toLocaleString()
    });
  }

  function countPriceSum() {
    return products.reduce(function(sum, item) {
      return sum + item.price;
    }, 0);
  }
}

function Product(name, description, price) {
  this.name = name;
  this.description = description;
  this.price = price;
  let logs = [];
  let lastCart;
  const self = this;

  this.getPrice = function() {
    return this.price;
  };

  this.setPrice = function(amount) {
    if (isValidPrice(amount)) {
      if (amount >= this.price) {
        this.price = amount;
      } else {
        console.log(`New price should be bigger than existing price`);
      }
      return this;
    } else {
      console.log(`New price is invalid`);
    }
  };

  this.add = function(cart) {
    addToHistoryLog(`Product addition`, cart);
    if (lastCart) {
      const products = lastCart.getProducts();
      const index = products.indexOf(this);
      if (index !== -1) {
        lastCart.removeProduct(index);
      }
    }
    lastCart = cart;
    return this;
  };

  this.removeProduct = function(cart) {
    addToHistoryLog(`Product removal`, cart);
    return this;
  };

  this.getHistory = () => logs;

  function addToHistoryLog(operationType, cart) {
    logs.push({
      operationType: operationType,
      cart: cart.name,
      product: self.name,
      price: self.price,
      operationTime: new Date().toLocaleString()
    });
  }
}

function isValidPrice(num) {
  return isFinite(num) && num > 0;
}

//test
const myCart = new ShoppingCart(`userCart`, `User`, 3);
const myCart2 = new ShoppingCart(`user2Cart`, `User2`, 6);

const myProduct = new Product(`garlic`, `test`, 15);
const myProduct2 = new Product(`potato`, `test`, 10);
const myProduct3 = new Product(`coffee`, `test`, 3);
const myProduct4 = new Product(`soap`, `test`, 5);

console.log(myProduct4.getPrice());
myProduct4.setPrice(3);
myProduct4.setPrice(7);
myProduct4.setPrice(`test`);
console.log(myProduct4.getPrice());

myCart.addNewProduct(myProduct);
myCart.addNewProduct(myProduct2);
myCart.addNewProduct(myProduct3);
myCart.addNewProduct(myProduct4).removeProduct(0);

myCart2.addNewProduct(myProduct2);
myCart2.addNewProduct(`test`);

console.log(myCart.getFormattedListOfProducts());
console.log(myCart2.getProducts());

console.log(myCart.getAveragePrice());
console.log(myCart.getTotalPrice());

console.log(myCart.getHistory());
console.log(myCart2.getHistory());
console.log(myProduct.getHistory());
console.log(myProduct2.getHistory());


