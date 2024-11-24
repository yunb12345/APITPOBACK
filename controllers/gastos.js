const GastosService = require('../services/gastos');

const getGastos = async (req, res) => {
    try {
        const gastos = await GastosService.getGastos();
        res.status(200).json(gastos);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const createGasto = async (req,res) =>{
    try {
        const gasto = await GastosService.createGasto(req.body);
        res.status(200).json(gasto);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
const getGastoByTransaccionId = async(req,res) =>{
    const {
        id
    } = req.params;
    try {
        const gasto = await GastosService.getGastosByTransaccion(Number(id));
        if (!gasto) res.status(404).json({
            message: 'Not Found!'
        });

        res.status(200).json(gasto);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getGastos,
    createGasto,
    getGastoByTransaccionId,
};