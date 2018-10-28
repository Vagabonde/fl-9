class Store {
  constructor(pizzaSlicePrice, weekendDiscount, nightDiscount, bonus = 0) {
    this._pizzaSlicePrice = pizzaSlicePrice;
    this._weekendDiscount = weekendDiscount;
    this._nightDiscount = nightDiscount;
    this._bonus = bonus;
  }

  get price() {
    return this._pizzaSlicePrice;
  }

  set price(num) {
    this._pizzaSlicePrice = num;
  }

  get bonus() {
    return this._bonus;
  }

  set bonus(num) {
    this._bonus = num;
  }

  buyPizzaSlice() {
    return `Price after discount is ${this.price} and you have ${this.bonus} bonuses`;
  }

}

class DecoratorDiscount extends Store {
  constructor(store) {
    super(store._pizzaSlicePrice, store._weekendDiscount, store._nightDiscount,
        store._bonus);
    this._store = store;
  }

  getDiscount() {
    const date = new Date();
    const isNighTime = date.getHours() >= 23 || date.getHours() <= 6 &&
        date.getHours() >= 0;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    if (isNighTime) {
      this._store.price -= this._store._nightDiscount;
    }
    if (isWeekend) {
      this._store.price -= this._store._weekendDiscount;
    }
  }
}

class DecoratorBonus extends Store {
  constructor(store) {
    super(store._pizzaSlicePrice, store._weekendDiscount, store._nightDiscount,
        store._bonus);
    this._store = store;
    this._oneBonusCost = 10;
  }

  setBonus() {
    this._store.bonus = Math.floor(this.price / this._oneBonusCost);
  }
}

//invocation example to avoid eslint errors
const store = new Store(20, 3, 4);
const decoratorDiscount = new DecoratorDiscount(store);
const decoratorBonus = new DecoratorBonus(store);
decoratorDiscount.getDiscount();
decoratorBonus.setBonus();