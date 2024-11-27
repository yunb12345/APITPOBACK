const UserSerice = require('../services/users');
const CloudinaryService = require('../services/cloudinary');
const AuthService = require('../services/auth');
const jwt = require('jsonwebtoken');
const bycrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const users = await UserSerice.getUsers();
        res.status(200).json({body:users});
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const getUserById = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const user = await UserSerice.getUserById(Number(id));
        if (!user) res.status(404).json({
            message: 'Not Found!'
        });

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const createUser = async (req, res) => {
    try {
        const{
            username,
            email,
            password,
            balance
        } = req.body;
        if(req.file){
            const fileBuffer = req.file.buffer;
            const urlImg = await CloudinaryService.uploadImage(fileBuffer);
            const hashedPassword = bycrypt.hashSync(password,10);
            const user = await UserSerice.createUser({...req.body,password:hashedPassword,imageUrl:urlImg});
            res.status(200).json(user);
        } else {
            const hashedPassword = bycrypt.hashSync(password,10);
            const user = await UserSerice.createUser({...req.body,password:hashedPassword});
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const updateUser = async (req,res) =>{
    const{
        id
    } = req.params;
    try{
        const user = await UserSerice.updateUser(req.body,Number(id));
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}
const login = async (req, res) => {
    try {
        const{
            email,
            password
        } = req.body;
        let isUserRegistered = await AuthService.hasValidCredentials(email,password);
        if(isUserRegistered){
            const user = await UserSerice.getUserByEmail(email);

            const token = jwt.sign(user.toJSON(),process.env.PRIVATE_KEY,{
                expiresIn:"1d",
            });
            return res.status(200).json({
                status:200,
                token,
                message:"Token creado"
            });
        } else{
            return res.status(401).json({
                message:"Unauthorized",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login
};