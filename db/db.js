const {Sequelize} = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);
const Proyect = ProyectModel(sequelize,Sequelize);
const Ticket = TicketModel(sequelize,Sequelize);

sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.log('Error: ', err);
    });


module.exports = {
    sequelize,
    User,
    Proyect,
    Ticket,
};