const {Router} = require('express');
const ProyectController = require('../controllers/proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();


router.get('/',ProyectController.getProyects); //http://localhost:8080/api/proyects/       endpoint final trae todos los proyectos
router.get('/:id', ProyectController.getProyectById);
router.post('/',
    [
        check("proyectName").not().isEmpty(),
        check("proyectDesc").not().isEmpty(),
        validateRequest,
    ],
    ProyectController.createProyect);
router.put('/:id',ProyectController.updateProyect);

module.exports = router;