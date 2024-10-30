const express = require("express");

const app = express();
const PORT = 8080;

app.get('/',(req,res) => {
    res.send("Hola mundo");
})

app.listen(PORT,() => {
    console.log('servidor corriendo en',PORT);
})
//localhost:8080

app.use('/api/users',require('./routes/users')); //https://localhost:8080/api/users