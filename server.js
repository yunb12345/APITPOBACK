const express = require("express");

const app = express();
const PORT = 8080;

app.get('/',(req,res) => { //req data que viene y res data que se va
    res.send("Hola mundo");
})

app.listen(PORT,() => {
    console.log('servidor corriendo en',PORT);
})
//localhost:8080

app.use('/api/users',require('./routes/users')); //https://localhost:8080/api/users
app.use('/api/proyects',require('./routes/proyects')); //https://localhost:8080/api/proyects
app.use('/api/tickets',require('./routes/tickets')); //https://localhost:8080/api/tickets