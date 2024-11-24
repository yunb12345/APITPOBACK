const UserSerice = require('../services/users');
const CloudinaryService = require('../services/cloudinary');

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
        if(req.file){
            const fileBuffer = req.file.buffer;
            const urlImg = await CloudinaryService.uploadImage(fileBuffer);
            const user = await UserSerice.createUser({...req.body,imageUrl:urlImg});
            res.status(200).json(user);
        } else {
            const user = await UserSerice.createUser(req.body);
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
    console.log("asdasd")
    try {
        const users = await UserSerice.login(req.body.email,req.body.password);
        res.status(200).json(users);
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