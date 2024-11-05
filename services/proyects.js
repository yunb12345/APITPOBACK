const { Proyect } = require("../db/db");

const getProyects = async () => await Proyect.findAll(); //esto es gracias a sequelize
const getProyectById = async (id) => await Proyect.findByPk(id);
const createProyect = async (proyect) => await Proyect.create(proyect);

module.exports = { //esta disponible para otros archivos de js
    getProyects,
    getProyectById,
    createProyect,
};