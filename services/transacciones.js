const { Transaccion } = require("../db/db");

const createTransaccion = async (transaccion) => await Transaccion.create(transaccion);
const getTransaccionByProyectId = async (proyectId) => await Transaccion.findAll(
    {
        where: {
          proyectId: proyectId
        },
        attributes: ['Id','montoTotal','nombreTransaccion'],
      }
);

module.exports = { //esta disponible para otros archivos de js
    createTransaccion,
    getTransaccionByProyectId
};