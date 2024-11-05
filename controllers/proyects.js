const ProyectService = require('../services/proyects');

const getProyect = async (req, res) => {
    try {
        const proyects = await ProyectService.getProyects();
        res.status(200).json(proyects);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    getProyect,
};