const {Routes} = require('express');
const UserController = require('../controllers/users');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Routes();

router.get('/',UserController.getUsers); //https://localhost:8080/api/users/       endpoint final trae todos los usuarios
router.get('/:id', UserController.getUserById); //https://localhost:8080/api/users/:id

module.exports = router;