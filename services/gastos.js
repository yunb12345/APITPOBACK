const { Gasto } = require("../db/db");

const getGastos = async () => await Gasto.findAll();
const getGastoById = async (id) => await Gasto.findByPk(id);
const createGasto = async (gasto) => await Gasto.create(gasto);

module.exports = { //esta disponible para otros archivos de js
    getGastos,
    getGastoById,
    createGasto,
};