const express = require('express')
const ngrok = require('ngrok');

var cleanSercorisac = require('/utils/cleanSercorisac.js')
var lavisaSQL = require('/utils/lavisaSQL.js')
var Scheduled = require("scheduled");

const app = express()
const port = process.env.PORT || 3000
// server configuration
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());

var chalk = require('chalk')


app.get('', (req, res) => {
    return res.send({
        mensaje: 'default'
    })
})

app.get('/startcronlavisa', (req, res) => {
    return res.send({
        mensaje: 'index'
    })
})


app.get('/startcronsercorisac', (req, res) => {
    return res.send({
        mensaje: 'index'
    })
})

app.post('/triggerpedido', (req, res) => {
    console.log(req.query)
    return res.send({
        success: true
    })
})




// var myJob = new Scheduled({
//     id: "Lavisa",
//     pattern: "*/1 14-23 * * 1-5", // Tarea a ejecutar cada dos minutos
//     task: function(){
//         console.log("Job Lavisa distribuidora");
//         lavisaSQL.ajustarPedidos()
//     }
// }).start();

 
// var jobSercorisac = new Scheduled({
//     id: "Sercorisac",
//     pattern: "*/1 14-23 * * 1-5", // Tarea a ejecutar cada dos minutos
//     task: function(){
//         console.log("Job Sercorisacn en integrado");
//         cleanSercorisac.iniciar()
//     }
// }).start();


// This metod needs to be last
// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Seratic SAC',
//         errorMessage: 'Page not found.'
//     })
// })


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

ngrok.connect({
    proto: 'http',
    addr: 3000
}, (err, url) => {
    if (err) {
        console.error('Error while connecting Ngrok', err);
        return new Error('Ngrok Failed');
    } else {
        console.log('Tunnel Created -> ', url);

    }
});