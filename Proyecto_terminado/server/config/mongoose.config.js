const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pestañas_spa_db', {})
    .then(res => console.log('Conexión con base de datos exitosa'))
    .catch(res =>console.log('No se pudo conectar a la base de datos'))