const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Gastos = sequelize.define('Gastos', {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
                primaryKey:true,
            },
        },
        transaccionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Transacciones',
                key: 'id',
                primaryKey:true,
            },
        },
        porcentaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Gastos;
}