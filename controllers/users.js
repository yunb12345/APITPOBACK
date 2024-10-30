const UserSerice = require('../services/users');
const { User } = require("../db/db");

const getUsers = async (req, res) => {
    try {
        const users = await UserSerice.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
