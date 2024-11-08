const { User } = require("../db/db");

const getUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);
const createUser = async (user) => await User.create(user);

module.exports = { //esta disponible para otros archivos de js
    getUsers,
    getUserById,
    createUser,
};