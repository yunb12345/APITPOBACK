const TransaccionService = require('../services/transacciones');

const createTransaccion = async (req, res) => {
    try {
        const transaccion = await TransaccionService.createTransaccion(req.body);
        res.status(200).json(transaccion);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getTransaccionByProyectId = async (req, res) => {
    const {
        id
      } = req.params;
        try { 
          const transactions = await TransaccionService.getTransaccionByProyectId(Number(id));
          res.status(200).json({body:transactions});
        } catch (err) {
          res.status(500).json({
            message: err.message
        });
        }
};


module.exports = {
    createTransaccion,
    getTransaccionByProyectId
};