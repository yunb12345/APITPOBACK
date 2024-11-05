const TicketService = require('../services/tickets');

const getTickets = async (req, res) => {
    try {
        const tickets = await TicketService.getTickets();
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    getTickets,
};