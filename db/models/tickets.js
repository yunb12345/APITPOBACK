const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const Ticket = sequelize.define('Ticket', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gastosId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Gastos',
                key: 'id',
            },
        },
    });

    return Ticket;
}