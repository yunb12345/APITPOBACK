const { Transaccion } = require("../db/db");

const createTransaccion = async (transaccion) => await Transaccion.create(transaccion);

module.exports = { //esta disponible para otros archivos de js
    createTransaccion,
};