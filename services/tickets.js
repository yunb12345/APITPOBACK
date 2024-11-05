const { Ticket } = require("../db/db");

const getTickets = async () => await Ticket.findAll();
const getTicketById = async (id) => await Ticket.findByPk(id);
const createTicket = async (ticket) => await Ticket.create(ticket);

module.exports = { //esta disponible para otros archivos de js
    getTickets,
    getTicketById,
    createTicket,
};