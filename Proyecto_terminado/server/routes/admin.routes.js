const AdminController = require('../controllers/admin.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/admin", AdminController.viewAllAdmins),
    app.get("/api/admin/spa", AdminController.verCitas),
    app.get("/api/cita/1", AdminController.listarCita1),
    app.get("/api/cita/2", AdminController.listarCita2),
    app.get("/api/cita/3", AdminController.listarCita3),
    app.delete("/api/admin/spa/:_id", AdminController.deleteCita)
}