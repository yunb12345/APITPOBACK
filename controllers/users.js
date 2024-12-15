require('dotenv').config();
const UserService = require('../services/users');
const CloudinaryService = require('../services/cloudinary');
const AuthService = require('../services/auth');
const jwt = require('jsonwebtoken');
const bycrypt = require("bcrypt");
const MailService = require('../services/mail');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');


const getUsers = async (req, res) => {
    try {
        const users = await UserService.getUsers();
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
        const user = await UserService.getUserById(Number(id));
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

const getUserByUserName = async (req, res) => {
    try {
        const user = await UserService.getUserByUserName(req.body.username);
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
            const user = await UserService.createUser({...req.body,password:hashedPassword,imageUrl:urlImg});
            return res.status(200).json({user,status:200});
        } else {
            const hashedPassword = bycrypt.hashSync(password,10);
            const user = await UserService.createUser({...req.body,password:hashedPassword});
            return res.status(200).json({user,status:200});
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
const updateUser = async (req,res) =>{
    const{
        id
    } = req.params;
    try{

        if(req.body.password){
            req.body.password = bycrypt.hashSync(req.body.password, 10);
        }
        console.log(req.body.balance);
        await UserService.updateUser(req.body,Number(id));
        
        if (req.body.balance && req.body.balance > 5000) {
            const templatePath = path.resolve(__dirname, '../template/email.template.hbs');
            const templateSource = fs.readFileSync(templatePath, 'utf8');
            const template = handlebars.compile(templateSource);
            const htmlContent = template({
                balance: req.body.balance,
                userName: req.body.username
            });
            await MailService.sendMail(
                req.body.email,
                `Tu saldo supera los 5000`,
                htmlContent
            );
        }
        
        const user = await UserService.getUserById(Number(id));

        const userProfile = {
            id: user.id,
            user: user.username,
            mail: user.email,
            balance: user.balance // Si tienes un campo de balance
        };
        return res.status(200).json(userProfile);
    }
    catch(err){
        return res.status(500).json({
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
            const user = await UserService.getUserByEmail(email);

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
        return res.status(500).json({
            message: err.message
        });
    }
};
const deleteUserById = async(req,res) => {
    try{
        const{
            id
        } = req.params;
        const user = await UserService.deleteUserById(id);
        return res.status(200).json({message:'Usuario eliminado'});
    }catch{
        return res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login,
    getUserByUserName,
    deleteUserById
};