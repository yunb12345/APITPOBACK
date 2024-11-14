const {Sequelize} = require('sequelize');
const UserModel = require('./models/users');
const ProyectModel = require('./models/proyects');
const TicketModel = require('./models/tickets');
const UserProyectModel = require('./models/users_projects');
const GastoModel = require('./models/gastos');
const dotenv = require('dotenv'); //variables de env 
dotenv.config();

const sequelize = new Sequelize(process.env.DEV_DB_NAME, process.env.DEV_DB_USERNAME, process.env.DEV_DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);
const Proyect = ProyectModel(sequelize,Sequelize);
const Ticket = TicketModel(sequelize,Sequelize);
const UsersProyects = UserProyectModel(sequelize,Sequelize);
const Gasto = GastoModel(sequelize,Sequelize);

User.hasMany(Gasto, {
    foreignKey: 'userId',
    sourceKey: 'id',
    onDelete: 'CASCADE'
});
Gasto.belongsTo(User,{
    foreignKey:'userId',
    targetKey:'id',
    onDelete:'CASCADE',
    as:'author'
});
Proyect.hasMany(Gasto,{
    foreignKey: 'proyectId',
    sourceKey:'id',
    onDelete:'CASCADE'
});
Gasto.belongsTo(Proyect,{
    foreignKey:'proyectId',
    targetKey:'id',
    onDelete:'CASCADE',
    as:'proytect',
});

Gasto.hasOne(Ticket,{
    foreignKey:'ticketId',
    name:'ticketId',
    sourceKey:'id',
    onDelete:'CASCADE',
});
Ticket.belongsTo(Gasto,{
    foreignKey:'ticketId',
    targetKey:'id',
    onDelete:'CASCADE',
    as:'ticket',
});

//User.belongsToMany(Proyect,{through:UsersProyects}); // de muchos a muchos
//Proyect.belongsToMany(User,{through:UsersProyects}); 


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
    UsersProyects,
    Gasto,
};