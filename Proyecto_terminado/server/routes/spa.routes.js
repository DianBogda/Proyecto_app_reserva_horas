const SpaController = require('../controllers/spa.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/spa", SpaController.verCitasUser),
    app.post("/api/spa", SpaController.solicitarCita),
    app.put("/api/spa/:_id", SpaController.actualizarCita),
    app.delete("/api/spa/:_id", SpaController.eliminarCita),
    app.get("/api/spa/:_id", SpaController.verCitaId),
    app.post("/api/spa/confirmarCita", authenticate, SpaController.confirmarCita)
}