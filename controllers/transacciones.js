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
const getTransaccionById = async (req,res) => {
    const {
        id
    } = req.params;
    console.log(id);
    try{
        const transaction = await TransaccionService.getTransaccionById(Number(id));
        return res.status(200).json(transaction);
    } catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}
const getTransaccionByProyectId = async (req, res) => {
    const {
        id
      } = req.params;
        try { 
          const transactions = await TransaccionService.getTransaccionByProyectId(Number(id));
          return res.status(200).json({transactions});
        } catch (err) {
          return res.status(500).json({
            message: err.message
        });
        }
};

module.exports = {
    createTransaccion,
    getTransaccionByProyectId,
    getTransaccionById,
};