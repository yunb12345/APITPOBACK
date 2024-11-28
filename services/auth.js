require("dotenv").config();
const bycrypt = require("bcrypt");
const { User } = require("../db/db");

class AuthService{
    async hasValidCredentials(mail,pass){
        try{
            const user = await User.findOne({
                where:{
                    email:mail
                }
            });
            const isMatch = await bycrypt.compare(pass, user.password);
            if(isMatch){
                return true;
            }
            return false
        } catch(err){
            console.error(err);
            throw new Error("Error en la validacion de credenciales");
        }
    }
}

module.exports = new AuthService();