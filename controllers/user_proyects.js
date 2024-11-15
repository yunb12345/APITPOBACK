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

  module.exports = {
    getUsersByProyect,
    getProyectsByUser,
    assignUser
};