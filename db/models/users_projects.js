const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const UsersProyects = sequelize.define('UsersProyects', {
        balance: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

    return UsersProyects;
}