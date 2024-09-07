const mongoose = require('mongoose');

// Conexión a la base de datos
const DB_URI = 'mongodb://127.0.0.1:27017/Monoliticos';

module.exports = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error al conectar a MongoDB', err);
        process.exit(1); // Detener la aplicación
    }
};
