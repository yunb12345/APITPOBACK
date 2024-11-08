const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password : DataTypes.STRING,
        balance : DataTypes.INTEGER,
    });

    return User;
}