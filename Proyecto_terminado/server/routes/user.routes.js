const UserController = require('../controllers/user.controllers');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app) {    
    app.get('/api/users', UserController.viewAllUsers),
    app.post('/api/user', UserController.registerNewUser),
    app.post('/api/user/login', UserController.loginUser),
    app.get('/auth/test', authenticate, UserController.test)
}