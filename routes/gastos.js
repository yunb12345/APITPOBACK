const {Router} = require('express');
const GastoController = require('../controllers/gastos');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/',GastoController.getGastos); //http://localhost:8080/api/gastos/       endpoint final trae todos los gastos
router.post('/',[
    check("porcentaje").not().isEmpty(),
    validateRequest,
],
GastoController.createGasto);
router.get('/transaccion/:id',GastoController.getGastoByTransaccionId);



module.exports = router;