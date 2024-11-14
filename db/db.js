const {Sequelize} = require('sequelize');
const UserModel = require('./models/users');
const ProyectModel = require('./models/proyects');
const TransaccionModel = require('./models/transacciones');
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
const Transaccion = TransaccionModel(sequelize,Sequelize);
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
Proyect.hasMany(Transaccion,{
    foreignKey: 'proyectId',
    sourceKey:'id',
    onDelete:'CASCADE'
});
Transaccion.belongsTo(Proyect,{
    foreignKey:'proyectId',
    targetKey:'id',
    onDelete:'CASCADE',
});

Gasto.hasOne(Transaccion,{
    foreignKey:'transaccionId',
    name:'transaccionId',
    sourceKey:'id',
    onDelete:'CASCADE',
});
Transaccion.belongsTo(Gasto,{
    foreignKey:'transaccionId',
    targetKey:'id',
    onDelete:'CASCADE',
    as:'transaccion',
});

User.belongsToMany(Proyect, {
    through: UsersProyects,
});
Proyect.belongsToMany(User, {
    through: UsersProyects,
});

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
    Transaccion,
    UsersProyects,
    Gasto,
};