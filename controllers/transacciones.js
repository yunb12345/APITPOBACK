const TransaccionService = require('../services/transacciones');
const CloudinaryService = require('../services/cloudinary');

const createTransaccion = async (req, res) => {
    const fileBuffer = req.file.buffer;
    try {
        const urlImg = await CloudinaryService.uploadImage(fileBuffer);
        const transaccion = await TransaccionService.createTransaccion({
            ...req.body,
            proyectId:parseInt(req.body.proyectId,10),
            montoTotal:parseFloat(req.body.montoTotal,10),
            imageUrl:urlImg
        });
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