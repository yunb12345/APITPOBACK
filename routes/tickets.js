const {Routes} = require('express');
const TicketController = require('../controllers/proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Routes();

router.get('/',TicketController.getTickets); //https://localhost:8080/api/users/       endpoint final trae todos los usuarios

module.exports = router;