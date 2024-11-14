const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Gastos = sequelize.define('Gastos', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        proyectId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Proyects',
                key: 'id',
            },
        },
        ticketId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tickets',
                key: 'id',
            },
        },
        nombre: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        monto: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        porcentaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Gastos;
}