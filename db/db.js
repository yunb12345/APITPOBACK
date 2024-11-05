const {Sequelize} = require('sequelize');
const UserModel = require('./models/user');
const dotenv = require('dotenv'); //variables de env 
dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);
const Proyect = ProyectModel(sequelize,Sequelize);
const Ticket = TicketModel(sequelize,Sequelize);

User.hasMany(Ticket, {
    foreignKey: 'authorId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
Ticket.belongsTo(User,{
    foreignKey:'authorId',
    sourceKey:'id',
    onDelete:'CASCADE',
    as:'author',
});
Proyect.hasMany(Ticket,{
    foreignKey: 'proyectId',
    targetKey:'id',
    onDelete:'CASCADE',
})
Ticket.belongsTo(Proyect,{
    foreignKey:'proyectId',
    targetKey:'id',
    onDelete:'CASCADE',
    as:'proytect',
})

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