const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Transacciones = sequelize.define('Transacciones', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        proyectId:{
            type:DataTypes.INTEGER,
            references:{
                model:'Proyects',
                key:'id',
            }
        },
        montoTotal:{
            type:DataTypes.FLOAT,
            allowNull:false,   
        },
        nombreTransaccion:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    });

    return Transacciones;
}