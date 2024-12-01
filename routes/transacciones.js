const {Router} = require('express');
const TransaccionController = require('../controllers/transacciones');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const multer = require('multer');


const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/',
    upload.single('file'),
    [
        check("nombreTransaccion").not().isEmpty(),
        validateRequest,
    ],
    TransaccionController.createTransaccion);
router.get('/proyects/:id', TransaccionController.getTransaccionByProyectId); //http://localhost:8080/api/transacciones/proyects
router.get('/:id',TransaccionController.getTransaccionById);

module.exports = router;