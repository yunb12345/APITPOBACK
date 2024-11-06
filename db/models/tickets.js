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