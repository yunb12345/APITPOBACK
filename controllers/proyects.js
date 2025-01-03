const { Proyect } = require('../db/db');
const ProyectService = require('../services/proyects');

const getProyects = async (req, res) => {
    try {
        const proyects = await ProyectService.getProyects();
        res.status(200).json(proyects);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const getProyectById = async(req,res) =>{
    const {
        id
    } = req.params;
    try {
        const proyect = await ProyectService.getProyectById(Number(id));
        if (!proyect){
            return res.status(404).json({
                message: 'Not Found!'
            });
        } 

        //res.status(200).json(proyect);
        res.json(proyect);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}
const createProyect = async (req, res) => {
    try {
        const proyect = await ProyectService.createProyect(req.body);
        return res.status(200).json(proyect);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
const updateProyect = async(req,res) =>{
    const{
        id
    } = req.params;
    try{
        const proyect = await ProyectService.updateProyect(req.body,Number(id));
        res.status(200).json(proyect);
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
const deleteProyectById = async(req,res)=>{
    const{
        id
    } = req.params;
    try{
        const proyect = await ProyectService.deleteProyectById(id);
        return res.status(200).json({message:'Proyecto eliminado'});
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}
module.exports = {
    getProyects,
    createProyect,
    getProyectById,
    updateProyect,
    deleteProyectById,
};