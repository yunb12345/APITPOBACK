const {Router} = require('express');
const TicketController = require('../controllers/tickets');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();

router.get('/',TicketController.getTickets); //http://localhost:8080/api/users/       endpoint final trae todos los usuarios

module.exports = router;