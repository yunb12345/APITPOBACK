const express = require("express");
const dotenv = require('dotenv'); //esto para variables de entorno
const {
    sequelize
} = require('./db/db');
dotenv.config();

const app = express();
const PORT = 8080;

app.get('/',(req,res) => { //req data que viene y res data que se va
    res.send("Hola mundo");
})

app.listen(PORT,() => {
    console.log('servidor corriendo en',PORT);
})
//localhost:8080

app.use('/api/users',require('./routes/users')); //http://localhost:8080/api/users
app.use('/api/proyects',require('./routes/proyects')); //http://localhost:8080/api/proyects
app.use('/api/tickets',require('./routes/tickets')); //http://localhost:8080/api/tickets

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established!');
    })
    .catch(err => {
        console.log('Error: ', err);
    });

