const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        proyectId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Proyect',
                key: 'id',
            },
        },
        ticketName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticketDesc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Ticket;
}