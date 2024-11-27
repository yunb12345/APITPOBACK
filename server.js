const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');


const {
    sequelize
} = require('./db/db');
dotenv.config();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',     
};

app.use(cors(corsOptions));

app.get('/',(req,res) => { //req data que viene y res data que se va
    res.send("Hola mundo");
})

app.listen(PORT,() => {
    console.log('servidor corriendo en',PORT);
})
//localhost:8080

app.use('/api/users',require('./routes/users')); //http://localhost:8080/api/users
app.use('/api/proyects',require('./routes/proyects')); //http://localhost:8080/api/proyects
app.use('/api/gastos',require('./routes/gastos')); //http://localhost:8080/api/tickets
app.use('/api/transacciones',require('./routes/transacciones'));
app.use('/api/user_proyects',require('./routes/user_proyects'));

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established!');
    })
    .catch(err => {
        console.log('Error: ', err);
    });

