const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Gastos = sequelize.define('Gastos', {
        porcentaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Gastos;
}