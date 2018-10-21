const fs = require('fs');
const db = '../db/data.json';

module.exports.create = function(req, res) {
  const jsonContent = getDb();
  const lastId = jsonContent[jsonContent.length - 1].id;
  const reqData = req.body;
  if (jsonContent.find((car) => car.id === reqData.id) {
    res.status(409).send({'message': 'Car already exists.'});
  }
  const data = {id: lastId +1};
  Object.assign(data, reqData);
  jsonContent.push(data);
  fs.writeFile(db, JSON.stringify(jsonContent));
  res.setHeader('Content-Type', 'application/json');
  res.status(201).send(JSON.stringify(data));
};

module.exports.getAll = function(req, res) {
  const carsList = getDb();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(carsList));
};

module.exports.getById = function(req, res) {
  const carId = req.params.id;
  const carsList = getDb();
  const car = carsList.find((car) => car.id === parseInt(carId));
  if (!car) {
    res.status(404).send({'message': 'Car with such id has not been found'});
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(car));
};

module.exports.updateById = function(req, res) {
  const carId = req.params.id;
  let carsList = getDb();
  const reqData = req.body;
  if (!carsList.find((car) => car.id === parseInt(carId))) {
    res.status(404).send({'message': 'Car with such id has not been found'});
  }
  carsList = carsList.map((car) => {
    if (car.id === parseInt(carId)) {
      return Object.assign({id: car.id}, reqData);
    } else {
      return car;
    }
  });
  fs.writeFile(db, JSON.stringify(carsList));
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(reqData));
};

module.exports.deleteById = function(req, res) {
  const carId = req.params.id;
  const carsList = getDb();
  const car = carsList.find((car) => car.id === parseInt(carId));
  if (car) {
    carsList.splice(carsList.indexOf(car), 1);
    fs.writeFile(db, JSON.stringify(carsList));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({'message': 'The car has been successfully removed'});
  } else {
    res.status(404).send({'message':'Car with such id has not been found'});
  }
};

function getDb() {
  const contents = fs.readFileSync(db);
  return JSON.parse(contents);
}