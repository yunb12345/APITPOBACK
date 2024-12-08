const {Router} = require('express');
const UserProyectController = require('../controllers/user_proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/users/:id',UserProyectController.getUsersByProyect); 
router.get('/proyects/:id', UserProyectController.getProyectsByUser);
router.delete('/', UserProyectController.removeUserFromProyect);
router.post('/',[
    check("balance").not().isEmpty(),
    validateRequest,
],
UserProyectController.assignUser); 

router.put('/',UserProyectController.updateBalance);

module.exports = router;