const express = require('express');
const app = express();
const initDB = require('./Database/db');
const Fruit = require('./Models/fruits');  // Importar el modelo de la colección 'Fruits'


app.use(express.json());

// Inicializar la conexión con MongoDB
initDB();

// Crear una fruta (POST /fruits)
app.post('/fruits', async (req, res) => {
    try {
        const { nombre, color, cantidad } = req.body;
        const nuevaFruta = new Fruit({ nombre, color, cantidad });
        await nuevaFruta.save();
        res.status(201).json(nuevaFruta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la fruta' });
    }
});

// Obtener todas las frutas (GET /fruits)
app.get('/fruits', async (req, res) => {
    try {
        const frutas = await Fruit.find();
        res.status(200).json(frutas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las frutas' });
    }
});


// Actualizar una fruta por ID (PUT /fruits/id)
app.put('/fruits/:id', async (req, res) => {
    try {
        const { nombre, color, cantidad } = req.body;
        const frutaActualizada = await Fruit.findByIdAndUpdate(
            req.params.id,
            { nombre, color, cantidad },
            { new: true }  // Devuelve la fruta actualizada
        );
        if (!frutaActualizada) {
            return res.status(404).json({ error: 'Fruta no encontrada' });
        }
        res.status(200).json(frutaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la fruta' });
    }
});

// Eliminar una fruta por ID (DELETE /fruits/id)
app.delete('/fruits/:id', async (req, res) => {
    try {
        const frutaEliminada = await Fruit.findByIdAndDelete(req.params.id);
        if (!frutaEliminada) {
            return res.status(404).json({ error: 'Fruta no encontrada' });
        }
        res.status(200).json({ mensaje: 'Fruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la fruta' });
    }
});

// Eliminar una fruta por nombre (DELETE /fruits)
app.delete('/fruits', async (req, res) => {
    try {
        const { nombre } = req.body;  // El nombre de la fruta vendrá en el cuerpo de la solicitud
        const frutaEliminada = await Fruit.findOneAndDelete({ nombre: nombre });
        if (!frutaEliminada) {
            return res.status(404).json({ error: 'Fruta no encontrada' });
        }
        res.status(200).json({ mensaje: 'Fruta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la fruta' });
    }
});


/* Esta es la estructura que se debe enviar en el cuerpo de la solicitud para crear una fruta (POST /fruits):
   o para actualizar una fruta (PUT /fruits/id):

{
  "nombre": "Uva",
  "color": "Morado",
  "cantidad": 10
}

*/

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});