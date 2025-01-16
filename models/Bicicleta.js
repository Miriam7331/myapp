// Constructor
let Bicicleta = function (id, color, modelo, ubicacion) {
  this.id = id;
  this.color = color;
  this.modelo = modelo;
  this.ubicacion = ubicacion;
};

// Array
Bicicleta.allBicis = [];

// Método
Bicicleta.add = function (bici) {
  this.allBicis.push(bici);
};

// Bicicletas
let a = new Bicicleta(1, "Rojo", "Trek", [28.503789, -13.853296]);
let b = new Bicicleta(2, "Azul", "Orbea", [28.501367, -13.853476]);
Bicicleta.add(a);
Bicicleta.add(b);

//removeById
Bicicleta.removeById = function (id) {
  this.allBicis = this.allBicis.filter((bici) => bici.id !== id);
};

//findById
Bicicleta.findById = function (id) {
  return this.allBicis.find((bici) => bici.id === id);
};

// Exportando el módulo
module.exports = Bicicleta;
