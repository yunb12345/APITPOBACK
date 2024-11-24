const {Router} = require('express');
const UserController = require('../controllers/users');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const multer = require('multer');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',UserController.getUsers); //http://localhost:8080/api/users/       endpoint final trae todos los usuarios
router.get('/:id', UserController.getUserById); //http://localhost:8080/api/users/:id
router.post('/login',  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    validateRequest,
],
UserController.login);
router.post('/',
    upload.single('file'),
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser);

router.put('/:id',UserController.updateUser);

module.exports = router;