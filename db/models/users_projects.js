const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const UsersProyects = sequelize.define('UsersProyects', {
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
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return UsersProyects;
}