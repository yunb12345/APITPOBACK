const { Transaccion } = require("../db/db");

const createTransaccion = async (transaccion) => await Transaccion.create(transaccion);
const getTransaccionByProyectId = async (proyectId) => await Transaccion.findAll(
    {
        where: {
          proyectId: proyectId
        },
      }
);

//este no esta hecho
const getTransaccionByUserId = async (proyectId) => await Transaccion.findAll(
  {
      where: {
        userId: proyectId
      },
    }
);
const getTransaccionById = async(id) => await Transaccion.findByPk(id);
module.exports = { //esta disponible para otros archivos de js
    createTransaccion,
    getTransaccionByProyectId,
    getTransaccionByUserId,
    getTransaccionById,
};