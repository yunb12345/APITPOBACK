const {Router} = require('express');
const TransaccionController = require('../controllers/transacciones');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.post('/',
    [
        check("nombreTransaccion").not().isEmpty(),
        validateRequest,
    ],
    TransaccionController.createTransaccion);
router.get('/proyects/:id', TransaccionController.getTransaccionByProyectId);

module.exports = router;