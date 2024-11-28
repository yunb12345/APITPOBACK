const { User } = require("../db/db");

const getUsers = async () => await User.findAll();
const getUserById = async (id) => await User.findByPk(id);
const createUser = async (user) => await User.create(user);
const updateUser = async (user,userid) => await User.update(
    user,{
        where:{
            id:userid
        }
    }
);
const login = async (mail,pass) => await User.findOne({
        where:{
            email:mail,
            password: pass,
        }
    }
);
const getUserByEmail = async(mail) => await User.findOne({
    where:{
        email:mail
    }
});
module.exports = { //esta disponible para otros archivos de js
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login,
    getUserByEmail
};