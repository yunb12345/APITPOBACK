require("dotenv").config();
const bycrypt = require("bcrypt");
const UsuarioModel = require("../db/models/users");

class AuthService{
    async hasValidCredentials(email,password){
        try{
            
            const user = await UsuarioModel.findOne({
                email
            });
            const isPasswordValid = await bycrypt.compareSync(password,user.password);
            if(user && isPasswordValid){
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