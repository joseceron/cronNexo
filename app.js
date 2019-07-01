
var cleanSercorisac = require('./utils/cleanSercorisac.js')
var lavisaSQL = require('./utils/lavisaSQL.js')
var Scheduled = require("scheduled");

var chalk = require('chalk')


var myJob = new Scheduled({
    id: "Lavisa",
    pattern: "*/1 14-23 * * 1-5", // Tarea a ejecutar cada dos minutos
    task: function(){
        console.log("Job Lavisa distribuidora");
        lavisaSQL.ajustarPedidos()
    }
}).start();

 
var jobSercorisac = new Scheduled({
    id: "Sercorisac",
    pattern: "*/1 14-23 * * 1-5", // Tarea a ejecutar cada dos minutos
    task: function(){
        console.log("Job Sercorisacn en integrado");
        cleanSercorisac.iniciar()
    }
}).start();

