const { UsersProyects } = require('../db/db');
const UserProyects = require('../services/user_proyects');


const getUsersByProyect = async (req,res) => {
  const {
    id
  } = req.params;
    try { 
      const users = await UserProyects.getUsersByProyect(Number(id));
      res.status(200).json({body:users});
    } catch (err) {
      res.status(500).json({
        message: err.message
    });
    }
  };

  const getProyectsByUser = async (req,res) => {
    const {
      id
    } = req.params;
    try {
      const proyectos = await UserProyects.getProyectsByUser(Number(id));
      res.status(200).json(proyectos);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  };

  const removeUserFromProyect = async (req,res) => {
    try {
      const proyectos = await UserProyects.removeUserFromProyect(req.body.userid, req.body.proyectid);
      res.status(200).json(proyectos);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  };

  const assignUser = async(req,res) => {
      try {
        const proyect = await UserProyects.assignUser(req.body);
        res.status(200).json(proyect);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
  }

  const updateBalance = async(req,res) =>{

    try{
      console.log('Request Body:', req.body);
      console.log('Request Body:', req.body.ProyectId);
      const user_proyects = await UserProyects.updateBalance(req.body,req.body.UserId,req.body.ProyectId);
      return res.status(200).json(user_proyects);
    }
    catch(err){
      return res.status(500).json({
        message: err.message
    });
    }
  }
  module.exports = {
    getUsersByProyect,
    getProyectsByUser,
    assignUser,
    removeUserFromProyect,
    updateBalance
};