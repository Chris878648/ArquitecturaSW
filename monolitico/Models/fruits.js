const mongoose = require('mongoose');

// Definir el esquema para la colección 'Fruits' Son los campos que tendrá la colección

const FruitSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    color: { type: String, required: true },
    cantidad: { type: Number, required: true }
}, { collection: 'Fruits' }); 

const Fruit = mongoose.model('Fruit', FruitSchema);

module.exports = Fruit;
