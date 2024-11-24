const { UsersProyects } = require("../db/db");


const assignUser = async (userProyects) => await UsersProyects.create(userProyects);
const getUsersByProyect = async (proyectId) => await UsersProyects.findAll(
    {
        where: {
          ProyectId: proyectId
        },
        attributes: ['UserId'],
      }
);
const getProyectsByUser = async(userId) => await UsersProyects.findAll(
    {
        where: {
          UserId: userId
        },
        attributes: ['ProyectId'],
      }
);
const removeUserFromProyect = async(userId, ProyectId) => await UsersProyects.destroy({ 
  where: { 
    ProyectId: ProyectId,
    UserId: userId
  } 
}); 

module.exports = { //esta disponible para otros archivos de js
    assignUser,
    getUsersByProyect,
    getProyectsByUser,
    removeUserFromProyect
};