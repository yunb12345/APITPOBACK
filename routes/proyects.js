const {Router} = require('express');
const ProyectController = require('../controllers/proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/',ProyectController.getProyects); //http://localhost:8080/api/users/       endpoint final trae todos los usuarios

module.exports = router;