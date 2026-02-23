function getCars() {
  return JSON.parse(localStorage.getItem("cars")) || [];
}

function saveCars(cars) {
  localStorage.setItem("cars", JSON.stringify(cars));
}

function addCar(car) {
  const cars = getCars();
  cars.push(car);
  saveCars(cars);
}

function deleteCar(index) {
  const cars = getCars();
  cars.splice(index, 1);
  saveCars(cars);
}
