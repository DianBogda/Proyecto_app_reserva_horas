const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000/'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./routes/spa.routes')(app);
require('./routes/user.routes')(app);
require('./routes/admin.routes')(app);

const server = app.listen( port, () => console.log(`Escuchando en el puerto ${port}`));

const io = require('socket.io')(server);

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("reservacion_hora", data => {
        data.reserved = true;
        socket.broadcast.emit("hora_reservada", data);
    });
});