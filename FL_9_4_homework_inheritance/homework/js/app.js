//Task 1
function assign(obj, defaults, options) {
  for (let k in defaults) {
    if (defaults.hasOwnProperty(k)) {
      obj[k] = defaults[k];
    }
  }
  for (let k in options) {
    if (options.hasOwnProperty(k)) {
      obj[k] = options[k];
    }
  }

  return obj;
}

//Task 2
function Bot(configs, type = `Bot`) {
  this._name = configs.name;
  this._speed = configs.speed;
  this._x = configs.x;
  this._y = configs.y;
  this._defaultSpeed = configs.speed;
  this._type = type;
}

Bot.prototype.getSpeed = function() {
  return this._speed;
};
Bot.prototype.setSpeed = function(num) {
  this._speed = num;
};
Bot.prototype.getDefaultSpeed = function() {
  return this._defaultSpeed;
};
Bot.prototype.getCoordinates = function() {
  return {x: this._x, y: this._y};
};
Bot.prototype.setCoordinates = function(x, y) {
  this._x = x;
  this._y = y;
};

Bot.prototype.showPosition = function() {
  console.log(
      `I am ${this._type} ${this._name}. I am located at ${this._x} : ${this._y}.`);
};

Bot.prototype.move = function(action) {
  action = action.toLowerCase();
  switch (action) {
    case `up`:
      this._y += this._speed;
      break;
    case `down`:
      this._y -= this._speed;
      break;
    case `left`:
      this._x -= this._speed;
      break;
    case `right`:
      this._x += this._speed;
      break;
    default:
      console.log(`The direction was specified incorrectly`);
  }
};

function Racebot(configs) {
  Bot.call(this, configs, `Racebot`);
  this._lastAction = ``;
}

Racebot.prototype = Object.create(Bot.prototype);
Racebot.prototype.constructor = Racebot;

Racebot.prototype.move = function(action) {
  if (this._lastAction === action) {
    this._speed++;
  } else {
    this._speed = this._defaultSpeed;
  }
  this._lastAction = action;

  Bot.prototype.move.call(this, action);
};

function Speedbot(configs) {
  Bot.call(this, configs, `Speedbot`);
}

Speedbot.prototype = Object.create(Bot.prototype);
Speedbot.prototype.constructor = Speedbot;

Speedbot.prototype.move = function(action) {
  Bot.prototype.move.call(this, action);

  if (this._speed !== this._defaultSpeed) {
    this._speed--;
  }
};

Speedbot.prototype.prepareEngine = function() {
  this._speed += 2;
};

