const {Router} = require('express');
const UserController = require('../controllers/users');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/',UserController.getUsers); //http://localhost:8080/api/users/       endpoint final trae todos los usuarios
router.get('/:id', UserController.getUserById); //http://localhost:8080/api/users/:id
router.post('/',
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser);

module.exports = router;