const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Proyect = sequelize.define('Proyect', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        proyectName : DataTypes.STRING,
        proyectDesc : DataTypes.STRING,
    });

    return Proyect;
}