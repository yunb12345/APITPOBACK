const { UsersProyects } = require("../db/db");


const assignUser = async (userProyects) => await UsersProyects.create(userProyects);
const getUsersByProyect = async (proyectId) => await UsersProyects.findAll(
    {
        where: {
          ProyectId: proyectId
        },
      }
);
const getProyectsByUser = async(userId) => await UsersProyects.findAll(
    {
        where: {
          UserId: userId
        },
      }
);
const removeUserFromProyect = async(userId, ProyectId) => await UsersProyects.destroy({ 
  where: { 
    ProyectId: ProyectId,
    UserId: userId
  } 
}); 
const updateBalance = async (userProyect,userId,proyectId) => await UsersProyects.update(
    userProyect,{where:{
      Userid:userId,
      ProyectId:proyectId
    }
    }
);

module.exports = { //esta disponible para otros archivos de js
    assignUser,
    getUsersByProyect,
    getProyectsByUser,
    removeUserFromProyect,
    updateBalance
};