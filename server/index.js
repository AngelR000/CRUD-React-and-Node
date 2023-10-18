const express = require("express");

const app = express();

const mysql = require("mysql");

const cors = require("cors");


app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "usuariosreact"
});

app.post("/crear", (req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const peso = req.body.peso;
    const fecha = req.body.fecha;

    db.query('INSERT INTO personas(nombre, edad, peso, fecha) VALUES(?,?,?,?)',[nombre, edad, peso, fecha],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Registrado con Exito");
        }
    });
});


app.get("/ver", (req, res)=>{
    db.query('SELECT * FROM personas',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete("/actualizar", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const peso = req.body.peso;
    const fecha = req.body.fecha;

    db.query('UPDATE personas SET nombre=?, edad=?, peso=?, fecha=? WHERE id=?',[nombre, edad, peso, fecha, id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Actualizado con Exito");
        }
    });
});


app.delete("/borrar/:id", (req, res)=>{
    const id = req.params.id;
    db.query('DELETE FROM personas WHERE id=?',[id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.listen(3001, ()=>{
    console.log("Server Corriendo Exitosamente");
});